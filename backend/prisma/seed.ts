// prisma/seed.ts
import { PrismaClient, Role, PropertyType, Status, VerificationStatus } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

// Simple client — no adapter needed
const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // STEP 1: Clean existing data (delete in correct order due to foreign keys)
  await prisma.verificationRequest.deleteMany()
  await prisma.review.deleteMany()
  await prisma.message.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.propertyImage.deleteMany()
  await prisma.property.deleteMany()
  await prisma.user.deleteMany()
  console.log('Cleaned existing data')

  // STEP 2: Hash password once and reuse for all test users
  const hashedPassword = await bcrypt.hash('Password123!', 10)

  // STEP 3: Create Admin user
  const admin = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@umuragetrust.rw',
      phone: '+250780000001',
      password: hashedPassword,
      role: Role.ADMIN,
      isVerified: true,
    },
  })
  console.log('Admin created:', admin.email)

  // STEP 4: Create Agent user
  const agent = await prisma.user.create({
    data: {
      fullName: 'Jean Pierre Habimana',
      email: 'agent@umuragetrust.rw',
      phone: '+250780000002',
      password: hashedPassword,
      role: Role.AGENT,
      isVerified: true,
    },
  })
  console.log('Agent created:', agent.email)

  // STEP 5: Create Buyer user
  const buyer = await prisma.user.create({
    data: {
      fullName: 'Marie Claire Uwase',
      email: 'buyer@umuragetrust.rw',
      phone: '+250780000003',
      password: hashedPassword,
      role: Role.BUYER,
      isVerified: true,
    },
  })
  console.log('Buyer created:', buyer.email)

  // STEP 6: Create Property 1 - House in Kigali (APPROVED)
  const property1 = await prisma.property.create({
    data: {
      title: 'Modern 3 Bedroom House in Kimihurura',
      description: 'A beautiful modern house in Kimihurura, Kigali. Close to embassies and international schools. Features a large garden, parking, and 24/7 security.',
      priceRwf: 85000000,
      priceUsd: 60000,
      priceType: 'sale',
      sizeSqm: 220,
      propertyType: PropertyType.HOUSE,
      district: 'Gasabo',
      sector: 'Kimihurura',
      city: 'Kigali',
      latitude: -1.9441,
      longitude: 30.0619,
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      amenities: ['Garden', 'Parking', '24/7 Security', 'Water Tank'],
      features: ['Modern Kitchen', 'Tiled Floors', 'Built-in Wardrobes'],
      isFeatured: true,
      isVerified: true,
      status: Status.APPROVED,
      slug: 'modern-3-bedroom-house-kimihurura',
      ownerId: agent.id,
      images: {
        create: [
          { imageUrl: 'https://placehold.co/800x600?text=House+Front' },
          { imageUrl: 'https://placehold.co/800x600?text=Living+Room' },
        ],
      },
    },
  })
  console.log('Property 1 created:', property1.title)

  // STEP 7: Create Property 2 - Land in Musanze (PENDING)
  const property2 = await prisma.property.create({
    data: {
      title: 'Prime Land Plot Near Volcanoes National Park',
      description: 'A 500 sqm land plot in Musanze district, ideal for eco-tourism or residential development. Stunning views of the Virunga mountains.',
      priceRwf: 12000000,
      priceUsd: 8500,
      priceType: 'sale',
      sizeSqm: 500,
      propertyType: PropertyType.LAND,
      district: 'Musanze',
      sector: 'Muhoza',
      city: 'Musanze',
      latitude: -1.4990,
      longitude: 29.6349,
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      amenities: ['Mountain View'],
      features: ['Corner Plot', 'Ready to Build'],
      isFeatured: false,
      isVerified: false,
      status: Status.PENDING,
      slug: 'prime-land-plot-musanze-volcanoes',
      ownerId: agent.id,
      images: {
        create: [
          { imageUrl: 'https://placehold.co/800x600?text=Land+Plot' },
        ],
      },
    },
  })
  console.log('Property 2 created:', property2.title)

  // STEP 8: Create Property 3 - Villa in Rubavu (APPROVED, featured)
  const property3 = await prisma.property.create({
    data: {
      title: 'Luxury Lake Kivu Villa with Private Beach',
      description: 'Stunning 5-bedroom villa overlooking Lake Kivu in Rubavu. Private beach access, infinity pool, and lush tropical garden. Perfect for luxury living or high-end vacation rental.',
      priceRwf: 250000000,
      priceUsd: 180000,
      priceType: 'sale',
      sizeSqm: 450,
      propertyType: PropertyType.VILLA,
      district: 'Rubavu',
      sector: 'Gisenyi',
      city: 'Gisenyi',
      latitude: -1.6932,
      longitude: 29.2564,
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      floors: 2,
      yearBuilt: 2022,
      amenities: ['Private Beach', 'Infinity Pool', 'Garden', 'Generator', 'Staff Quarters'],
      features: ['Lake View', 'Modern Finishes', 'Smart Home', 'Solar System'],
      isFeatured: true,
      isVerified: true,
      status: Status.APPROVED,
      slug: 'luxury-lake-kivu-villa-rubavu',
      ownerId: agent.id,
      images: {
        create: [
          { imageUrl: 'https://placehold.co/800x600?text=Villa+Front' },
          { imageUrl: 'https://placehold.co/800x600?text=Pool' },
          { imageUrl: 'https://placehold.co/800x600?text=Lake+View' },
        ],
      },
    },
  })
  console.log('Property 3 created:', property3.title)

  // STEP 9: Create Property 4 - Office in Kicukiro (APPROVED)
  const property4 = await prisma.property.create({
    data: {
      title: 'Modern Office Space in Kicukiro Commercial Hub',
      description: 'Fully furnished office space in Kicukiro\'s newest commercial complex. Open-plan layout with private meeting rooms, kitchenette, and high-speed fiber internet.',
      priceRwf: 45000000,
      priceUsd: 32000,
      priceType: 'rent',
      sizeSqm: 180,
      propertyType: PropertyType.OFFICE,
      district: 'Kicukiro',
      sector: 'Kicukiro',
      city: 'Kigali',
      latitude: -1.9807,
      longitude: 30.0925,
      bedrooms: 0,
      bathrooms: 2,
      parking: 4,
      floors: 3,
      amenities: ['Fiber Internet', 'Meeting Rooms', 'Kitchenette', 'Security', 'Generator'],
      features: ['Open Plan', 'Furnished', 'Reception Area'],
      isFeatured: false,
      isVerified: true,
      status: Status.APPROVED,
      slug: 'modern-office-space-kicukiro',
      ownerId: agent.id,
      images: {
        create: [
          { imageUrl: 'https://placehold.co/800x600?text=Office+Front' },
          { imageUrl: 'https://placehold.co/800x600?text=Open+Plan' },
        ],
      },
    },
  })
  console.log('Property 4 created:', property4.title)

  // STEP 10: Buyer saves Property 1 as a favorite
  await prisma.favorite.create({
    data: {
      userId: buyer.id,
      propertyId: property1.id,
    },
  })
  console.log('Favorite created')

  // STEP 11: Buyer sends a message to Agent about Property 1
  await prisma.message.create({
    data: {
      content: 'Hello, I am interested in the house in Kimihurura. Is it still available?',
      senderId: buyer.id,
      receiverId: agent.id,
      propertyId: property1.id,
    },
  })
  console.log('Message created')

  // STEP 12: Buyer leaves a 5-star review for the Agent
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Very professional agent, responded quickly and showed us great properties!',
      reviewerId: buyer.id,
      agentId: agent.id,
      propertyId: property1.id,
    },
  })
  console.log('Review created')

  // STEP 13: Create a verification request for Property 2
  await prisma.verificationRequest.create({
    data: {
      documentUrl: 'https://placehold.co/400x300?text=Land+Title+Doc',
      status: VerificationStatus.PENDING,
      propertyId: property2.id,
      userId: agent.id,
      reviewedBy: admin.id,
    },
  })
  console.log('Verification request created')

  // DONE - print test credentials
  console.log('\n=== SEED COMPLETE - TEST ACCOUNTS ===')
  console.table([
    { role: 'ADMIN', email: 'admin@umuragetrust.rw', password: 'Password123!' },
    { role: 'AGENT', email: 'agent@umuragetrust.rw', password: 'Password123!' },
    { role: 'BUYER', email: 'buyer@umuragetrust.rw', password: 'Password123!' },
  ])
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })