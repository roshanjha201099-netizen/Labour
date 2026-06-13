from fastapi import APIRouter, HTTPException, status

from models import (
    LoginRequest,
    LoginResponse,
    SignUpRequest,
    UserProfileResponse,
    UserResponse,
    WalletResponse,
)

router = APIRouter()

DEMO_USERS = {
    "roshan@gmail.com": {
        "password": "12345678",
        "name": "Roshan",
        "role": "customer",
        "phone": "9876543210",
        "image_url": "/placeholder-user.jpg",
        "wallet_balance": 10,
    },
    "rohan@gmail.com": {
        "password": "12345678",
        "name": "Rohan",
        "role": "service provider",
        "phone": "9876543211",
        "image_url": "/placeholder-user.jpg",
        "wallet_balance": 10,
    },
    "akash@gmail.com": {
        "password": "12345678",
        "name": "Akash",
        "role": "admin",
        "phone": "9876543212",
        "image_url": "/placeholder-user.jpg",
        "wallet_balance": 10,
    },
}


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    user = DEMO_USERS.get(payload.email.lower())

    if not user or user["password"] != payload.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return LoginResponse(
        access_token=f"demo-token-{user['role'].replace(' ', '-')}",
        user=UserResponse(
            email=payload.email,
            name=user["name"],
            role=user["role"],
            userProfile=UserProfileResponse(
                email=payload.email,
                phone=user["phone"],
                image_url=user["image_url"],
            ),
            wallet=WalletResponse(balance=user["wallet_balance"]),
        ),
    )


@router.post("/signup", response_model=LoginResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignUpRequest):
    email = payload.email.lower()

    if email in DEMO_USERS:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    DEMO_USERS[email] = {
        "password": payload.password,
        "name": payload.name,
        "phone": payload.phone,
        "role": payload.role,
        "image_url": "/placeholder-user.jpg",
        "wallet_balance": 10,
    }

    return LoginResponse(
        access_token=f"demo-token-{payload.role.replace(' ', '-')}",
        user=UserResponse(
            email=payload.email,
            name=payload.name,
            role=payload.role,
            userProfile=UserProfileResponse(
                email=payload.email,
                phone=payload.phone,
                image_url="/placeholder-user.jpg",
            ),
            wallet=WalletResponse(balance=10),
        ),
    )
