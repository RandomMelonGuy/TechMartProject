from pydantic import BaseModel
from typing import List, Dict, Any

class GraphRequest(BaseModel):
    user_id: int

class GraphNode(BaseModel):
    id: str
    label: str
    type: str

class GraphEdge(BaseModel):
    source: str
    to: str

class GraphData(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

class GraphResponse(BaseModel):
    status: str
    data: GraphData