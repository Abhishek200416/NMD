#!/usr/bin/env python3
"""
Backend API Testing Script
Tests all public API endpoints for the ministry platform
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from environment
BACKEND_URL = "https://spiritual-home-5.preview.emergentagent.com/api"

def test_get_brands():
    """Test GET /api/brands endpoint"""
    print("🔍 Testing GET /api/brands...")
    try:
        response = requests.get(f"{BACKEND_URL}/brands", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            brands = response.json()
            print(f"   Response Type: {type(brands)}")
            print(f"   Brands Count: {len(brands) if isinstance(brands, list) else 'Not a list'}")
            
            if isinstance(brands, list):
                if len(brands) > 0:
                    print(f"   Sample Brand: {brands[0].get('name', 'No name')} (ID: {brands[0].get('id', 'No ID')})")
                    return True, brands[0].get('id')  # Return first brand ID for other tests
                else:
                    print("   ⚠️  Empty brands list")
                    return True, None
            else:
                print("   ❌ Response is not a list")
                return False, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None

def test_get_events(brand_id=None):
    """Test GET /api/events endpoint"""
    url = f"{BACKEND_URL}/events"
    if brand_id:
        url += f"?brand_id={brand_id}"
        print(f"🔍 Testing GET /api/events?brand_id={brand_id}...")
    else:
        print("🔍 Testing GET /api/events...")
    
    try:
        response = requests.get(url, timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            events = response.json()
            print(f"   Response Type: {type(events)}")
            print(f"   Events Count: {len(events) if isinstance(events, list) else 'Not a list'}")
            
            if isinstance(events, list):
                if len(events) > 0:
                    print(f"   Sample Event: {events[0].get('title', 'No title')}")
                else:
                    print("   ⚠️  Empty events list")
                return True
            else:
                print("   ❌ Response is not a list")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_get_ministries(brand_id=None):
    """Test GET /api/ministries endpoint"""
    url = f"{BACKEND_URL}/ministries"
    if brand_id:
        url += f"?brand_id={brand_id}"
        print(f"🔍 Testing GET /api/ministries?brand_id={brand_id}...")
    else:
        print("🔍 Testing GET /api/ministries...")
    
    try:
        response = requests.get(url, timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            ministries = response.json()
            print(f"   Response Type: {type(ministries)}")
            print(f"   Ministries Count: {len(ministries) if isinstance(ministries, list) else 'Not a list'}")
            
            if isinstance(ministries, list):
                if len(ministries) > 0:
                    print(f"   Sample Ministry: {ministries[0].get('title', 'No title')}")
                else:
                    print("   ⚠️  Empty ministries list")
                return True
            else:
                print("   ❌ Response is not a list")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_get_announcements(brand_id=None):
    """Test GET /api/announcements endpoint"""
    url = f"{BACKEND_URL}/announcements"
    if brand_id:
        url += f"?brand_id={brand_id}"
        print(f"🔍 Testing GET /api/announcements?brand_id={brand_id}...")
    else:
        print("🔍 Testing GET /api/announcements...")
    
    try:
        response = requests.get(url, timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            announcements = response.json()
            print(f"   Response Type: {type(announcements)}")
            print(f"   Announcements Count: {len(announcements) if isinstance(announcements, list) else 'Not a list'}")
            
            if isinstance(announcements, list):
                if len(announcements) > 0:
                    print(f"   Sample Announcement: {announcements[0].get('title', 'No title')}")
                else:
                    print("   ⚠️  Empty announcements list")
                return True
            else:
                print("   ❌ Response is not a list")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_post_contact(brand_id=None):
    """Test POST /api/contact endpoint"""
    print("🔍 Testing POST /api/contact...")
    
    # Use a test brand ID or create a dummy one
    test_brand_id = brand_id or "test-brand-id"
    
    contact_data = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@email.com",
        "subject": "Prayer Request",
        "message": "Please pray for my family during this difficult time. We need strength and guidance.",
        "brand_id": test_brand_id
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict):
                print(f"   Created Contact ID: {result.get('id', 'No ID')}")
                print(f"   Contact Name: {result.get('name', 'No name')}")
                return True
            else:
                print("   ❌ Response is not a dict")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_post_subscribers(brand_id=None):
    """Test POST /api/subscribers endpoint"""
    print("🔍 Testing POST /api/subscribers...")
    
    # Use a test brand ID or create a dummy one
    test_brand_id = brand_id or "test-brand-id"
    
    subscriber_data = {
        "email": "michael.chen@email.com",
        "brand_id": test_brand_id
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/subscribers",
            json=subscriber_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict):
                print(f"   Created Subscriber ID: {result.get('id', 'No ID')}")
                print(f"   Subscriber Email: {result.get('email', 'No email')}")
                return True
            else:
                print("   ❌ Response is not a dict")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

# ========== NEW MEMBER/USER AUTHENTICATION TESTS ==========

def test_admin_login():
    """Test admin login to get admin token"""
    print("🔍 Testing Admin Login...")
    
    login_data = {
        "email": "admin@ndm.com",
        "password": "admin123"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict) and "token" in result:
                print(f"   Admin Token: {result['token'][:20]}...")
                print(f"   Admin Email: {result.get('admin', {}).get('email', 'No email')}")
                return True, result["token"]
            else:
                print("   ❌ Response missing token")
                return False, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None

def test_user_register(brand_id):
    """Test POST /api/users/register - Register new member"""
    print("🔍 Testing POST /api/users/register...")
    
    user_data = {
        "email": "john.smith@gracechurch.org",
        "password": "SecurePass123!",
        "name": "John Smith",
        "phone": "+1-555-0123",
        "brand_id": brand_id
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/users/register",
            json=user_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict) and "token" in result:
                print(f"   User Token: {result['token'][:20]}...")
                print(f"   User Name: {result.get('user', {}).get('name', 'No name')}")
                print(f"   User Email: {result.get('user', {}).get('email', 'No email')}")
                return True, result["token"], result.get('user', {}).get('id')
            else:
                print("   ❌ Response missing token or user")
                return False, None, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None, None

def test_user_login():
    """Test POST /api/users/login - Login member"""
    print("🔍 Testing POST /api/users/login...")
    
    login_data = {
        "email": "john.smith@gracechurch.org",
        "password": "SecurePass123!"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/users/login",
            json=login_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict) and "token" in result:
                print(f"   Login Token: {result['token'][:20]}...")
                print(f"   User Name: {result.get('user', {}).get('name', 'No name')}")
                return True, result["token"]
            else:
                print("   ❌ Response missing token")
                return False, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None

def test_get_current_user(user_token):
    """Test GET /api/users/me - Get current logged in member info"""
    print("🔍 Testing GET /api/users/me...")
    
    try:
        headers = {
            "Authorization": f"Bearer {user_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(
            f"{BACKEND_URL}/users/me",
            headers=headers,
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict):
                print(f"   User Name: {result.get('name', 'No name')}")
                print(f"   User Email: {result.get('email', 'No email')}")
                print(f"   User Role: {result.get('role', 'No role')}")
                return True
            else:
                print("   ❌ Response is not a dict")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_get_all_users(admin_token, brand_id):
    """Test GET /api/users - Get all members for a brand (admin only)"""
    print("🔍 Testing GET /api/users...")
    
    try:
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json"
        }
        
        url = f"{BACKEND_URL}/users"
        if brand_id:
            url += f"?brand_id={brand_id}"
        
        response = requests.get(url, headers=headers, timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, list):
                print(f"   Users Count: {len(result)}")
                if len(result) > 0:
                    print(f"   Sample User: {result[0].get('name', 'No name')}")
                return True
            else:
                print("   ❌ Response is not a list")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_create_user_by_admin(admin_token, brand_id):
    """Test POST /api/users - Admin creates new member"""
    print("🔍 Testing POST /api/users (Admin Create User)...")
    
    user_data = {
        "email": "mary.johnson@gracechurch.org",
        "password": "AdminCreated123!",
        "name": "Mary Johnson",
        "phone": "+1-555-0456",
        "brand_id": brand_id
    }
    
    try:
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/users",
            json=user_data,
            headers=headers,
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict):
                print(f"   Created User Name: {result.get('name', 'No name')}")
                print(f"   Created User Email: {result.get('email', 'No email')}")
                return True, result.get('id')
            else:
                print("   ❌ Response is not a dict")
                return False, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None

def test_toggle_user_status(admin_token, user_id):
    """Test PUT /api/users/{user_id}/status - Admin toggles member status"""
    print("🔍 Testing PUT /api/users/{user_id}/status...")
    
    try:
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json"
        }
        
        # Toggle to inactive
        response = requests.put(
            f"{BACKEND_URL}/users/{user_id}/status?is_active=false",
            headers=headers,
            timeout=10
        )
        print(f"   Status Code (deactivate): {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Deactivate Response: {result.get('message', 'No message')}")
            
            # Toggle back to active
            response2 = requests.put(
                f"{BACKEND_URL}/users/{user_id}/status?is_active=true",
                headers=headers,
                timeout=10
            )
            print(f"   Status Code (reactivate): {response2.status_code}")
            
            if response2.status_code == 200:
                result2 = response2.json()
                print(f"   Reactivate Response: {result2.get('message', 'No message')}")
                return True
            else:
                print(f"   ❌ Reactivate failed with status {response2.status_code}")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

# ========== GIVING CATEGORY TESTS ==========

def test_get_giving_categories(brand_id):
    """Test GET /api/giving-categories?brand_id={id}"""
    print("🔍 Testing GET /api/giving-categories...")
    
    try:
        url = f"{BACKEND_URL}/giving-categories"
        if brand_id:
            url += f"?brand_id={brand_id}"
        
        response = requests.get(url, timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, list):
                print(f"   Categories Count: {len(result)}")
                if len(result) > 0:
                    print(f"   Sample Category: {result[0].get('name', 'No name')}")
                    return True, result[0].get('id')
                else:
                    print("   ⚠️  Empty categories list")
                    return True, None
            else:
                print("   ❌ Response is not a list")
                return False, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None

def test_create_giving_category(admin_token, brand_id):
    """Test POST /api/giving-categories - Create new giving category"""
    print("🔍 Testing POST /api/giving-categories...")
    
    category_data = {
        "name": "Building Fund",
        "description": "Contributions for church building maintenance and improvements",
        "brand_id": brand_id
    }
    
    try:
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/giving-categories",
            json=category_data,
            headers=headers,
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict):
                print(f"   Created Category: {result.get('name', 'No name')}")
                print(f"   Category ID: {result.get('id', 'No ID')}")
                return True, result.get('id')
            else:
                print("   ❌ Response is not a dict")
                return False, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None

# ========== STRIPE PAYMENT TESTS ==========

def test_create_checkout_session(brand_id, category_id=None):
    """Test POST /api/payments/create-checkout - Create Stripe checkout session"""
    print("🔍 Testing POST /api/payments/create-checkout...")
    
    checkout_data = {
        "amount": 50.00,
        "category": "Tithe",
        "category_id": category_id,
        "donor_name": "David Wilson",
        "brand_id": brand_id
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/payments/create-checkout",
            json=checkout_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict) and "url" in result and "session_id" in result:
                print(f"   Checkout URL: {result['url'][:50]}...")
                print(f"   Session ID: {result['session_id']}")
                return True, result["session_id"]
            else:
                print("   ❌ Response missing url or session_id")
                return False, None
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False, None
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False, None

def test_get_payment_status(session_id):
    """Test GET /api/payments/status/{session_id} - Check payment status"""
    print("🔍 Testing GET /api/payments/status/{session_id}...")
    
    try:
        response = requests.get(
            f"{BACKEND_URL}/payments/status/{session_id}",
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict):
                print(f"   Payment Status: {result.get('payment_status', 'No status')}")
                print(f"   Transaction Status: {result.get('status', 'No status')}")
                print(f"   Amount: ${result.get('amount', 0)}")
                return True
            else:
                print("   ❌ Response is not a dict")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_get_payment_history(user_token):
    """Test GET /api/payments/history - Get user's giving history"""
    print("🔍 Testing GET /api/payments/history...")
    
    try:
        headers = {
            "Authorization": f"Bearer {user_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(
            f"{BACKEND_URL}/payments/history",
            headers=headers,
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, list):
                print(f"   Payment History Count: {len(result)}")
                if len(result) > 0:
                    print(f"   Latest Payment: ${result[0].get('amount', 0)} - {result[0].get('category', 'No category')}")
                return True
            else:
                print("   ❌ Response is not a list")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_get_all_transactions(admin_token):
    """Test GET /api/payments/transactions - Get all transactions (admin only)"""
    print("🔍 Testing GET /api/payments/transactions...")
    
    try:
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(
            f"{BACKEND_URL}/payments/transactions",
            headers=headers,
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, list):
                print(f"   Total Transactions: {len(result)}")
                if len(result) > 0:
                    print(f"   Latest Transaction: ${result[0].get('amount', 0)} - {result[0].get('payment_status', 'No status')}")
                return True
            else:
                print("   ❌ Response is not a list")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

# ========== LIVE STREAM TESTS ==========

def test_get_live_streams(brand_id):
    """Test GET /api/live-streams?brand_id={id}"""
    print("🔍 Testing GET /api/live-streams...")
    
    try:
        url = f"{BACKEND_URL}/live-streams"
        if brand_id:
            url += f"?brand_id={brand_id}"
        
        response = requests.get(url, timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, list):
                print(f"   Live Streams Count: {len(result)}")
                if len(result) > 0:
                    print(f"   Sample Stream: {result[0].get('title', 'No title')}")
                return True
            else:
                print("   ❌ Response is not a list")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_get_active_stream(brand_id):
    """Test GET /api/live-streams/active?brand_id={id}"""
    print("🔍 Testing GET /api/live-streams/active...")
    
    try:
        url = f"{BACKEND_URL}/live-streams/active"
        if brand_id:
            url += f"?brand_id={brand_id}"
        
        response = requests.get(url, timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if result is None:
                print("   ⚠️  No active stream (expected)")
                return True
            elif isinstance(result, dict):
                print(f"   Active Stream: {result.get('title', 'No title')}")
                print(f"   Stream URL: {result.get('stream_url', 'No URL')}")
                return True
            else:
                print("   ❌ Response is not dict or null")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def test_create_live_stream(admin_token, brand_id):
    """Test POST /api/live-streams - Create new live stream"""
    print("🔍 Testing POST /api/live-streams...")
    
    stream_data = {
        "title": "Sunday Morning Service",
        "description": "Join us for worship and the Word",
        "stream_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "thumbnail_url": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "is_live": True,
        "scheduled_time": "2024-01-21T10:00:00Z",
        "brand_id": brand_id
    }
    
    try:
        headers = {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/live-streams",
            json=stream_data,
            headers=headers,
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Response Type: {type(result)}")
            if isinstance(result, dict):
                print(f"   Created Stream: {result.get('title', 'No title')}")
                print(f"   Stream ID: {result.get('id', 'No ID')}")
                print(f"   Is Live: {result.get('is_live', False)}")
                return True
            else:
                print("   ❌ Response is not a dict")
                return False
        else:
            print(f"   ❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def main():
    """Run all backend API tests"""
    print("=" * 60)
    print("🚀 BACKEND API TESTING STARTED")
    print(f"Backend URL: {BACKEND_URL}")
    print("=" * 60)
    
    results = {}
    brand_id = None
    
    # Test 1: GET /api/brands
    success, brand_id = test_get_brands()
    results['brands'] = success
    print()
    
    # Test 2: GET /api/events (with and without brand_id)
    results['events_all'] = test_get_events()
    print()
    if brand_id:
        results['events_by_brand'] = test_get_events(brand_id)
        print()
    
    # Test 3: GET /api/ministries (with and without brand_id)
    results['ministries_all'] = test_get_ministries()
    print()
    if brand_id:
        results['ministries_by_brand'] = test_get_ministries(brand_id)
        print()
    
    # Test 4: GET /api/announcements (with and without brand_id)
    results['announcements_all'] = test_get_announcements()
    print()
    if brand_id:
        results['announcements_by_brand'] = test_get_announcements(brand_id)
        print()
    
    # Test 5: POST /api/contact
    results['contact_post'] = test_post_contact(brand_id)
    print()
    
    # Test 6: POST /api/subscribers
    results['subscribers_post'] = test_post_subscribers(brand_id)
    print()
    
    # Summary
    print("=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = 0
    
    for test_name, success in results.items():
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{test_name:25} {status}")
        if success:
            passed += 1
        total += 1
    
    print("-" * 60)
    print(f"TOTAL: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED!")
        return 0
    else:
        print("⚠️  SOME TESTS FAILED!")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)