# FastAPI backend

Run the backend from the `api` folder:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Available demo logins:

- `roshan@gmail.com` / `12345678` -> customer
- `rohan@gmail.com` / `12345678` -> service provider
- `akash@gmail.com` / `12345678` -> admin

Each user also includes:
- `userProfile.email`
- `userProfile.phone`
- `userProfile.image_url`
- `wallet.balance` with initial value `10`

Signup is also available at `POST /auth/signup`.
It creates a demo in-memory user and returns the same auth payload shape as login,
so the frontend can redirect immediately by the returned role. New signup users also
start with wallet balance `10`.

The frontend expects the backend at `http://127.0.0.1:8000` by default.
Override it with `VITE_API_BASE_URL` in the frontend environment if needed.
