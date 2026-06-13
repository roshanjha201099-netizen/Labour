from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SignUpRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    role: str


class WalletResponse(BaseModel):
    balance: int


class UserProfileResponse(BaseModel):
    email: EmailStr
    phone: str
    image_url: str


class UserResponse(BaseModel):
    email: EmailStr
    name: str
    role: str
    userProfile: UserProfileResponse
    wallet: WalletResponse


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
