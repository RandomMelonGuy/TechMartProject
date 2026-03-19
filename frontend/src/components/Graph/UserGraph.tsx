'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { getUserGraph } from '../../../core/api';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
    loading: () => <div className="h-[400px] flex items-center justify-center text-white/10">Загрузка визуализации...</div>
});

export default function UserGraph({ userId }: { userId: number }) {
    const [data, setData] = useState({ nodes: [], links: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (userId) {
            setIsLoading(true);
            getUserGraph(userId)
                .then((res: any) => {
                    if (res.status === 'success' && res.data) {
                        setData(res.data);
                    }
                })
                .catch(() => setData({ nodes: [], links: [] }))
                .finally(() => setIsLoading(false));
        }
    }, [userId]);

    if (!mounted) return <div className="h-[500px]" />;

    if (isLoading) return <div className="h-[400px] flex items-center justify-center text-white/40 italic">Синхронизация с базой...</div>;

    if (!data.nodes || data.nodes.length === 0) {
        return (
            <div className="h-[400px] flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/5 rounded-[2rem]">
                <p>Проектов со связями пока нет</p>
                <span className="text-xs mt-2 opacity-50">Проверьте ID: {userId} в базе данных</span>
            </div>
        );
    }

    return (
        <div className="w-full h-[500px] relative bg-black/40 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
            <ForceGraph2D
                graphData={data}
                nodeLabel="name"
                backgroundColor="rgba(0,0,0,0)"
                nodeAutoColorBy="group"
                linkDirectionalParticles={4}
                linkDirectionalParticleSpeed={0.005}
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 14 / globalScale;
                    ctx.font = `${fontSize}px 'Inter', sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = node.group === 'user' ? '#60a5fa' : node.group === 'project' ? '#fbbf24' : '#34d399';
                    ctx.fillText(label, node.x, node.y + 12);
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
                    ctx.fill();
                    // Свечение
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = ctx.fillStyle;
                }}
            />
        </div>
    );
}