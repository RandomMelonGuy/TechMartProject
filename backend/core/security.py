import jwt
from fastapi import Request, HTTPException, Depends
from core.settings import settings
from jwt import InvalidSignatureError

def verify_user(req: Request):
    session = req.cookies.get("session")
    print(session)
    if not session:
        raise HTTPException(403, "User not Authorized")
    
    try:
        payload = jwt.decode(session, settings.JWTKEY, ["HS256"], leeway=4)
        return payload
    except InvalidSignatureError as e:
        print(repr(e))
        raise HTTPException(403, detail="JWT DECODING ERROR")

def verify_mentor(user = Depends(verify_user)):
    if user["role"] == "mentor":
        return user
    raise HTTPException(401, "User is not mentor")