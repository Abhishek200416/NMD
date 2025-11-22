#!/usr/bin/env python3
"""
Create admin user for testing
"""
import os
from pymongo import MongoClient
import bcrypt
import uuid
from datetime import datetime, timezone

# Connect to MongoDB
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['ministry_platform']

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Create admin user with new credentials
admin_data = {
    "id": str(uuid.uuid4()),
    "email": "promptforge.dev@gmail.com",
    "password_hash": hash_password("P9$wX!7rAq#4Lz@M2f"),
    "role": "admin",
    "created_at": datetime.now(timezone.utc).isoformat()
}

# Delete old admin if exists
db.admins.delete_many({"email": "admin@faithcenter.com"})

# Check if new admin already exists
existing = db.admins.find_one({"email": "promptforge.dev@gmail.com"})
if existing:
    print("Admin user already exists")
else:
    db.admins.insert_one(admin_data)
    print("Admin user created successfully")
    print(f"Email: promptforge.dev@gmail.com")
    print(f"Password: P9$wX!7rAq#4Lz@M2f")