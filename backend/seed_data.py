import os
from pymongo import MongoClient
from datetime import datetime, timedelta
import uuid

# Connect to MongoDB
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URL)
db = client['ministry_platform']

# Clear existing data
print("Clearing existing data...")
db.brands.delete_many({})
db.events.delete_many({})
db.ministries.delete_many({})
db.announcements.delete_many({})

# Create Nehemiah David Ministries Brand
ndm_id = str(uuid.uuid4())
ndm_brand = {
    "id": ndm_id,
    "name": "Nehemiah David Ministries",
    "domain": "nehemiahdavid.com",
    "tagline": "Imparting Faith, Impacting Lives",
    "logo_url": "https://nehemiahdavid.com/images/logo.svg",
    "hero_image_url": "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&q=80",
    "hero_video_url": "",
    "location": "Amaravathi Rd, above Yousta, Gorantla, Guntur, Andhra Pradesh 522034",
    "service_times": "Morning: 7:00 AM - 9:00 AM | Service: 10:00 AM - 12:00 PM | Evening (Online): 6:30 PM - 8:30 PM | Friday: 7:00 PM - 9:00 PM",
    "primary_color": "#1a1a1a",
    "secondary_color": "#4a90e2",
    "created_at": datetime.utcnow().isoformat()
}

# Create Faith Centre Brand
fc_id = str(uuid.uuid4())
fc_brand = {
    "id": fc_id,
    "name": "Faith Centre",
    "domain": "faithcentre.com",
    "tagline": "Imparting Faith, Impacting Lives",
    "logo_url": "https://nehemiahdavid.com/images/logo.svg",
    "hero_image_url": "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?w=1920&q=80",
    "hero_video_url": "",
    "location": "Amaravathi Rd, above Yousta, Gorantla, Guntur, Andhra Pradesh 522034",
    "service_times": "Morning: 7:00 AM - 9:00 AM | Service: 10:00 AM - 12:00 PM | Evening (Online): 6:30 PM - 8:30 PM | Friday: 7:00 PM - 9:00 PM",
    "primary_color": "#1a1a1a",
    "secondary_color": "#4a90e2",
    "created_at": datetime.utcnow().isoformat()
}

print("Creating brands...")
db.brands.insert_many([ndm_brand, fc_brand])

# Create events for Nehemiah David Ministries
ndm_events = [
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "REVIVE - 5 Day Revival Conference",
        "description": "Join us for a powerful 5-day revival experience! Experience renewed faith, powerful worship, and life-changing messages. December 3-7, 2025. Don't miss this transformative event!",
        "date": "2025-12-03",
        "time": "6:00 PM - 9:00 PM Daily",
        "location": "Main Sanctuary",
        "image_url": "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Sunday Worship Service",
        "description": "Join us for an uplifting worship experience with powerful praise and teaching from God's Word.",
        "date": (datetime.utcnow() + timedelta(days=7)).isoformat(),
        "time": "10:00 AM - 12:00 PM",
        "location": "Main Sanctuary",
        "image_url": "https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Youth Night",
        "description": "A special gathering for youth to connect, worship, and grow together in faith.",
        "date": (datetime.utcnow() + timedelta(days=12)).isoformat(),
        "time": "6:00 PM - 8:00 PM",
        "location": "Youth Center",
        "image_url": "https://images.unsplash.com/photo-1610070835951-156b6921281d?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Community Outreach Program",
        "description": "Serve our community with love and compassion. All volunteers welcome!",
        "date": (datetime.utcnow() + timedelta(days=20)).isoformat(),
        "time": "9:00 AM - 2:00 PM",
        "location": "Community Center",
        "image_url": "https://images.unsplash.com/photo-1621112904887-419379ce6824?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    }
]

# Create ministries for Nehemiah David Ministries
ndm_ministries = [
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Worship Team",
        "description": "Use your musical talents to lead our congregation in powerful worship.",
        "image_url": "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Children's Ministry",
        "description": "Nurturing the next generation with biblical foundations and fun activities.",
        "image_url": "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Community Outreach",
        "description": "Making a difference in our local community through acts of service and love.",
        "image_url": "https://images.unsplash.com/photo-1621112904887-419379ce6824?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Small Groups",
        "description": "Build meaningful relationships and grow spiritually in a small group setting.",
        "image_url": "https://images.unsplash.com/photo-1610070835951-156b6921281d?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    }
]

# Create announcements for Nehemiah David Ministries
ndm_announcements = [
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Welcome to Our Community!",
        "content": "We're excited to have you join us. Whether you're new to faith or looking for a church home, you'll find a warm welcome here.",
        "is_urgent": False,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Prayer Meeting This Wednesday",
        "content": "Join us for our weekly prayer meeting at 7:00 PM. Come together as we lift up our community, nation, and world in prayer.",
        "is_urgent": False,
        "created_at": datetime.utcnow().isoformat()
    }
]

# Create events for Faith Centre (same structure, different images)
fc_events = [
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "REVIVE - 5 Day Revival Conference",
        "description": "Join us for a powerful 5-day revival experience! Experience renewed faith, powerful worship, and life-changing messages. December 3-7, 2025. Don't miss this transformative event!",
        "date": "2025-12-03",
        "time": "6:00 PM - 9:00 PM Daily",
        "location": "Main Sanctuary",
        "image_url": "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Sunday Worship Service",
        "description": "Join us for an uplifting worship experience with powerful praise and teaching from God's Word.",
        "date": (datetime.utcnow() + timedelta(days=7)).isoformat(),
        "time": "10:00 AM - 12:00 PM",
        "location": "Main Sanctuary",
        "image_url": "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Youth Night",
        "description": "A special gathering for youth to connect, worship, and grow together in faith.",
        "date": (datetime.utcnow() + timedelta(days=12)).isoformat(),
        "time": "6:00 PM - 8:00 PM",
        "location": "Youth Center",
        "image_url": "https://images.unsplash.com/photo-1621112904887-419379ce6824?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Community Outreach Program",
        "description": "Serve our community with love and compassion. All volunteers welcome!",
        "date": (datetime.utcnow() + timedelta(days=20)).isoformat(),
        "time": "9:00 AM - 2:00 PM",
        "location": "Community Center",
        "image_url": "https://images.pexels.com/photos/31717532/pexels-photo-31717532.jpeg?w=800&q=80",
        "is_free": True,
        "created_at": datetime.utcnow().isoformat()
    }
]

# Create ministries for Faith Centre (same structure, different images)
fc_ministries = [
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Worship Team",
        "description": "Use your musical talents to lead our congregation in powerful worship.",
        "image_url": "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Children's Ministry",
        "description": "Nurturing the next generation with biblical foundations and fun activities.",
        "image_url": "https://images.unsplash.com/photo-1621112904887-419379ce6824?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Community Outreach",
        "description": "Making a difference in our local community through acts of service and love.",
        "image_url": "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Small Groups",
        "description": "Build meaningful relationships and grow spiritually in a small group setting.",
        "image_url": "https://images.unsplash.com/photo-1610070835951-156b6921281d?w=800&q=80",
        "created_at": datetime.utcnow().isoformat()
    }
]

# Create announcements for Faith Centre
fc_announcements = [
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Welcome to Our Community!",
        "content": "We're excited to have you join us. Whether you're new to faith or looking for a church home, you'll find a warm welcome here.",
        "is_urgent": False,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": fc_id,
        "title": "Prayer Meeting This Wednesday",
        "content": "Join us for our weekly prayer meeting at 7:00 PM. Come together as we lift up our community, nation, and world in prayer.",
        "is_urgent": False,
        "created_at": datetime.utcnow().isoformat()
    }
]

print("Creating events...")
db.events.insert_many(ndm_events + fc_events)

print("Creating ministries...")
db.ministries.insert_many(ndm_ministries + fc_ministries)

print("Creating announcements...")
db.announcements.insert_many(ndm_announcements + fc_announcements)

# Create foundations for Nehemiah David Ministries
ndm_foundations = [
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Children's Education Fund",
        "description": "Supporting underprivileged children with educational resources, school supplies, and scholarships. Help us make education accessible to every child in our community.",
        "image_url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        "gallery_images": [
            "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
            "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
        ],
        "goal_amount": 50000,
        "raised_amount": 12500,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Community Feeding Program",
        "description": "Providing meals and food assistance to families in need. Join us in fighting hunger and showing God's love through action.",
        "image_url": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
        "gallery_images": [
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
            "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
        ],
        "goal_amount": 30000,
        "raised_amount": 8750,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Widow & Orphan Care",
        "description": "Supporting widows and orphans with financial assistance, counseling, and community support. Be a blessing to those who need it most.",
        "image_url": "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
        "gallery_images": [
            "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&q=80",
            "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
            "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
            "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800&q=80",
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
        ],
        "goal_amount": 75000,
        "raised_amount": 25000,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "brand_id": ndm_id,
        "title": "Medical Mission Outreach",
        "description": "Providing free medical camps, health screenings, and medicine to underserved communities. Your donation saves lives.",
        "image_url": "https://images.unsplash.com/photo-1576765608622-7f259b5b4b4e?w=800&q=80",
        "gallery_images": [
            "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
            "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&q=80",
            "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80",
            "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
            "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=800&q=80",
            "https://images.unsplash.com/photo-1576765608622-7f259b5b4b4e?w=800&q=80"
        ],
        "goal_amount": 100000,
        "raised_amount": 35000,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat()
    }
]

print("Creating foundations...")
db.foundations.insert_many(ndm_foundations)

# Verify
print("\n=== Database Seeded Successfully! ===")
print(f"Brands: {db.brands.count_documents({})}")
print(f"Events: {db.events.count_documents({})}")
print(f"Ministries: {db.ministries.count_documents({})}")
print(f"Announcements: {db.announcements.count_documents({})}")
print(f"Foundations: {db.foundations.count_documents({})}")

client.close()
