import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';
import Category from '../models/Category.js';
import Service from '../models/Service.js';
import Design from '../models/Design.js';
import Gallery from '../models/Gallery.js';
import Video from '../models/Video.js';
import Testimonial from '../models/Testimonial.js';
import FAQ from '../models/FAQ.js';
import Coupon from '../models/Coupon.js';
import Setting from '../models/Setting.js';
import Booking from '../models/Booking.js';
import Measurement from '../models/Measurement.js';
import { ROLES } from '../constants/roles.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rk_stitches';

async function seed() {
  try {
    console.log('Connecting to database:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Beginning data seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Service.deleteMany({}),
      Design.deleteMany({}),
      Gallery.deleteMany({}),
      Video.deleteMany({}),
      Testimonial.deleteMany({}),
      FAQ.deleteMany({}),
      Coupon.deleteMany({}),
      Setting.deleteMany({}),
      Booking.deleteMany({}),
      Measurement.deleteMany({})
    ]);

    console.log('Existing collections cleared.');

    // 1. Users (Admin + Demo Customer)
    const adminUser = await User.create({
      name: 'RK Master Tailor (Admin)',
      email: 'admin@rkstitches.com',
      phone: '+919876543210',
      password: 'Admin@123456',
      role: ROLES.SUPER_ADMIN,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      isVerified: true
    });

    const customerUser = await User.create({
      name: 'Ananya Patel',
      email: 'ananya@example.com',
      phone: '+919812345678',
      password: 'Customer@123456',
      role: ROLES.CUSTOMER,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      addresses: [
        {
          street: 'Flat 302, Sri Sai Residency, Jubilee Hills',
          landmark: 'Near Checkpost',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500033',
          isDefault: true
        }
      ],
      isVerified: true
    });

    console.log('Users created:');
    console.log('  Admin:    admin@rkstitches.com / Admin@123456');
    console.log('  Customer: ananya@example.com / Customer@123456');

    // 2. Categories
    const categories = await Category.insertMany([
      { name: 'Blouses', slug: 'blouses', description: 'Designer, padded, princess cut and festive blouse stitching', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80', iconName: 'Scissors', order: 1 },
      { name: 'Maggam Work', slug: 'maggam-work', description: 'Intricate zardosi, aari, thread embroidery and bridal work', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', iconName: 'Sparkles', order: 2 },
      { name: 'Lehengas', slug: 'lehengas', description: 'Bridal, sangeet, and festive lehengas with canvas & can-can', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80', iconName: 'Crown', order: 3 },
      { name: 'Long Frocks', slug: 'long-frocks', description: 'Floor length designer gowns, umbrella cuts, and ethnic frocks', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80', iconName: 'Sparkle', order: 4 },
      { name: 'Kurtis & Suits', slug: 'kurtis', description: 'Straight cut, anarkali, sharara and daily comfort kurtis', image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80', iconName: 'Shirt', order: 5 },
      { name: 'Langa Blouses', slug: 'langa-blouses', description: 'Traditional South Indian Pattu Pavada sets for young ladies', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80', iconName: 'HeartHandshake', order: 6 },
      { name: 'Uniforms', slug: 'uniforms', description: 'Precision stitched school, college, hospital and corporate attire', image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80', iconName: 'Briefcase', order: 7 },
      { name: 'Tassels & Latkans', slug: 'tassels', description: 'Handcrafted silk thread, kundan and zardozi hanging latkans', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80', iconName: 'Star', order: 8 }
    ]);

    // 3. Services
    const services = await Service.insertMany([
      {
        name: 'Blouse Stitching & Styling',
        slug: 'blouse-stitching',
        category: 'Blouses',
        shortDescription: 'From simple daily wear to high-end designer padded blouses with bespoke back neck artistry.',
        description: 'Experience precision pattern cutting with master fitting. We specialize in Princess Cut, Katori, High Neck, Boat Neck, Sweetheart, Halter, and Backless cuts. Includes premium cotton lining, invisible zipper options, piped edges, and matching sleeve border alignments.',
        startingPrice: 650,
        priceRange: '₹650 - ₹1,800',
        estimatedDays: '3-4 business days',
        isAvailable: true,
        isFeatured: true,
        tags: ['Padded Blouse', 'Princess Cut', 'Bridal Blouse', 'Boat Neck', 'Custom Piping'],
        features: [
          'High grade pre-shrunk cotton inner lining',
          'Export quality padded cups or non-padded options',
          'Reinforced hooks and handmade thread eyes',
          'Complimentary side margin for future alterations (up to 2 inches)'
        ],
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80'
        ]
      },
      {
        name: 'Handcrafted Maggam & Aari Work',
        slug: 'maggam-work',
        category: 'Maggam Work',
        shortDescription: 'Regal hand-embroidery with pure zardozi, antique beads, kundan stones, and pearls.',
        description: 'Our master craftsmen create museum-grade maggam embroidery on silk, velvet, and raw silk fabrics. Choose from Peacock motifs, Lotus petals, Temple architecture borders, Bridal doli scenes, and contemporary geometric thread work.',
        startingPrice: 2200,
        priceRange: '₹2,200 - ₹18,000',
        estimatedDays: '7-12 business days',
        isAvailable: true,
        isFeatured: true,
        tags: ['Aari Work', 'Zardosi', 'Bridal Maggam', 'Kundan Embroidery', 'Peacock Motifs'],
        features: [
          '100% handcrafted by generational karigars',
          'High sheen non-tarnish metallic zardozi threads',
          'Custom traced artwork aligned to your exact neckline',
          'Stitching and lining included in bridal packages'
        ],
        images: [
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80'
        ]
      },
      {
        name: 'Bridal & Occasion Lehenga Stitching',
        slug: 'lehenga-stitching',
        category: 'Lehengas',
        shortDescription: 'Multi-kali lehengas, umbrella flair, heavy can-can installation, and designer cholis.',
        description: 'Step into fairy-tale flair with tailored bridal lehengas. Featuring double-layered stiff can-can for maximum volume, satin and buckram waistband support, handmade dori with jumbo latkans, and custom padded choli.',
        startingPrice: 2500,
        priceRange: '₹2,500 - ₹8,500',
        estimatedDays: '5-8 business days',
        isAvailable: true,
        isFeatured: true,
        tags: ['Bridal Lehenga', 'Can-Can Skirt', 'Umbrella Flare', 'Designer Choli', 'Kali Cut'],
        features: [
          'Dual layer volume can-can with soft butter crepe underskirt',
          'Concealed invisible side zipper with safety hook closure',
          'Dupatta border finishing and pico work included',
          'Full flare up to 8 meters circumference support'
        ],
        images: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
        ]
      },
      {
        name: 'Designer Long Frocks & Gowns',
        slug: 'long-frocks',
        category: 'Long Frocks',
        shortDescription: 'Floor-length Western and Indo-Western flared gowns with elegant drapery.',
        description: 'Turn silk sarees or fresh yardage into showstopper floor-length dresses. Perfect for birthdays, receptions, pre-wedding shoots, and festive celebrations. Supports pleated yokes, bell sleeves, and layered ruffles.',
        startingPrice: 1400,
        priceRange: '₹1,400 - ₹4,500',
        estimatedDays: '4-6 business days',
        isAvailable: true,
        isFeatured: true,
        tags: ['Indo Western', 'Floor Length', 'Saree Conversion', 'Organza Gown', 'Anarkali Frock'],
        features: [
          'Expert saree-to-frock conversion preserving rich pallu placement',
          'Heavy satin and soft mul-mul inner lining for comfort',
          'Custom belt and tie-back dori with matching tassels'
        ],
        images: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop&q=80'
        ]
      },
      {
        name: 'Kurti & Salwar Suit Stitching',
        slug: 'kurti-stitching',
        category: 'Kurtis & Suits',
        shortDescription: 'Flawless everyday elegance: Straight cut, A-line, Alia cut, and Anarkali suits.',
        description: 'Impeccable fits for office, casual outings, and festivities. We craft kurtis, pant sets, palazzos, churidars, and dhoti pants with neat necklines, lace inserts, and functional pockets.',
        startingPrice: 500,
        priceRange: '₹500 - ₹1,400',
        estimatedDays: '2-4 business days',
        isAvailable: true,
        isFeatured: true,
        tags: ['Straight Kurti', 'Alia Cut', 'Anarkali Suit', 'Pant Set', 'Office Wear'],
        features: [
          'Includes side phone pocket on demand',
          'Interlock stitching for lifelong seams',
          'Comfortable armhole and side slit finishing'
        ],
        images: [
          'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80'
        ]
      },
      {
        name: 'Traditional Langa Blouse (Pattu Pavada)',
        slug: 'langa-blouse',
        category: 'Langa Blouses',
        shortDescription: 'Authentic South Indian festive wear for babies, girls, and teens.',
        description: 'Classic Pattu Pavada sets stitched with traditional box pleats, soft cotton lining to prevent silk itchiness, and extendable inner folds that allow the skirt length to expand as your child grows.',
        startingPrice: 850,
        priceRange: '₹850 - ₹2,200',
        estimatedDays: '3-5 business days',
        isAvailable: true,
        isFeatured: false,
        tags: ['Pattu Pavada', 'Half Saree', 'Traditional Wear', 'Kids Ethnic'],
        features: [
          'Grow-with-child inner margin folds (up to 3 inches extension)',
          'Soft, breathable butter crepe inner lining that never scratches young skin',
          'Traditional zari border alignment'
        ],
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop&q=80'
        ]
      },
      {
        name: 'School, College & Corporate Uniforms',
        slug: 'uniform-stitching',
        category: 'Uniforms',
        shortDescription: 'Durable, neat, and standardized stitching for schools, colleges, and staff.',
        description: 'Bulk and single uniform stitching for pinafores, shirts, trousers, skirts, lab coats, and salwar uniforms. Precise collar fusing, reinforced pocket corners, and badge placement.',
        startingPrice: 450,
        priceRange: '₹450 - ₹1,100',
        estimatedDays: '3-5 business days',
        isAvailable: true,
        isFeatured: false,
        tags: ['School Uniform', 'College Salwar', 'Pinafore', 'Corporate Attire', 'Bulk Stitching'],
        features: [
          'Double-stitched stress points for playground endurance',
          'Standard sizing chart or custom made-to-measure',
          'School crest & badge machine embroidery integration'
        ],
        images: [
          'https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&auto=format&fit=crop&q=80'
        ]
      },
      {
        name: 'Designer Tassels & Latkan Crafting',
        slug: 'tassel-crafting',
        category: 'Tassels & Latkans',
        shortDescription: 'Handcrafted bridal hangings with silk thread balls, pearls, kundan, and mirrors.',
        description: 'Complete your blouses and lehenga doris with custom handmade tassels matched to your saree fabric and contrast borders.',
        startingPrice: 350,
        priceRange: '₹350 - ₹1,500',
        estimatedDays: '1-2 business days',
        isAvailable: true,
        isFeatured: false,
        tags: ['Handmade Latkans', 'Silk Thread Tassels', 'Bridal Dori', 'Pearl Hangings'],
        features: [
          'Fabric coordinated matching colors',
          'Heavy weight beads and metallic bells that chime softly'
        ],
        images: [
          'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80'
        ]
      }
    ]);

    // 4. Designs / Fashion Collections
    const designs = await Design.insertMany([
      {
        title: 'Imperial Peacock Maggam Blouse',
        slug: 'imperial-peacock-maggam-blouse',
        category: 'Maggam Work',
        description: 'A masterpiece created on pure mulberry raw silk. Features twin royal peacocks facing each other along the back neckline, worked with antique gold zardozi, ruby kundan stones, and delicate pearl drop beads.',
        images: [
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80'
        ],
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-with-a-needle-41716-large.mp4',
        estimatedPrice: 4800,
        priceNote: 'Maggam work + tailoring + lining included',
        tags: ['Bridal', 'Peacock', 'Antique Zari', 'Raw Silk'],
        fabricRecommendation: 'Kanjeevaram Silk, Raw Silk, Brocade',
        stitchingDays: '8-10 days',
        isFeatured: true,
        likesCount: 142
      },
      {
        title: 'Crimson Velvet Bridal Heritage Lehenga',
        slug: 'crimson-velvet-bridal-heritage-lehenga',
        category: 'Lehengas',
        description: 'Full flare 16-kali bridal lehenga in rich crimson micro-velvet. Embellished with heavy dabka, cut-dana, and floral jaal embroidery. Features custom built-in can-can for dramatic silhouette.',
        images: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
        ],
        videoUrl: '',
        estimatedPrice: 9500,
        priceNote: 'Stitching cost with dual layer can-can and dupatta border setting',
        tags: ['Bridal', 'Velvet', '16 Kali', 'Can-Can Flare'],
        fabricRecommendation: 'Velvet, Heavy Silk, Brocade',
        stitchingDays: '10-14 days',
        isFeatured: true,
        likesCount: 218
      },
      {
        title: 'Pastel Sage Organza Anarkali Gown',
        slug: 'pastel-sage-organza-anarkali-gown',
        category: 'Long Frocks',
        description: 'Floor-touching organza flared frock with hand-pleated sweetheart yoke and lightweight pearl lace borders. Perfectly breathable and photogenic for reception dinners.',
        images: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
        ],
        videoUrl: '',
        estimatedPrice: 2800,
        priceNote: 'Tailoring + inner satin crepe lining',
        tags: ['Pastel', 'Organza', 'Floor Length', 'Sweetheart Yoke'],
        fabricRecommendation: 'Organza, Georgette, Chiffon',
        stitchingDays: '5-7 days',
        isFeatured: true,
        likesCount: 96
      },
      {
        title: 'Princess Cut Sheer Back Blouse',
        slug: 'princess-cut-sheer-back-blouse',
        category: 'Blouses',
        description: 'Contemporary cocktail blouse featuring a jewel neckline in front and an illusion net cutout back adorned with scattered Swarovski crystal droplets and back loop buttons.',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80'
        ],
        videoUrl: '',
        estimatedPrice: 1200,
        priceNote: 'Includes padded cups and illusion net mounting',
        tags: ['Illusion Back', 'Padded', 'Cocktail', 'Princess Cut'],
        fabricRecommendation: 'Net, Satin, Georgette',
        stitchingDays: '4-5 days',
        isFeatured: true,
        likesCount: 165
      },
      {
        title: 'Handloom Kanchi Pattu Pavada Set',
        slug: 'handloom-kanchi-pattu-pavada-set',
        category: 'Langa Blouses',
        description: 'Vibrant mustard and royal blue traditional South Indian langa blouse set for teens. Features broad golden zari border pleating and puff sleeves with contrast pipe borders.',
        images: [
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop&q=80'
        ],
        videoUrl: '',
        estimatedPrice: 1400,
        priceNote: 'Stitching with soft crepe lining & extendable hem',
        tags: ['Pattu Pavada', 'Traditional', 'Puff Sleeves', 'Zari Border'],
        fabricRecommendation: 'Pure Silk, Kanjeevaram Silk, Gadwal Pattu',
        stitchingDays: '4-6 days',
        isFeatured: true,
        likesCount: 88
      },
      {
        title: 'Mirror & Gota Patti Festive Kurti Suit',
        slug: 'mirror-gota-patti-festive-kurti-suit',
        category: 'Kurtis & Suits',
        description: 'Flared A-line festive kurti featuring silver gota patti geometric borders around the neck and sleeves, accompanied by tailored straight cigarette pants with bottom slit accents.',
        images: [
          'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=900&auto=format&fit=crop&q=80'
        ],
        videoUrl: '',
        estimatedPrice: 950,
        priceNote: 'Stitching for kurti & cigarette pants',
        tags: ['Gota Patti', 'A-Line', 'Cigarette Pant', 'Festive'],
        fabricRecommendation: 'Chanderi Silk, Rayon, Cotton Silk',
        stitchingDays: '3-4 days',
        isFeatured: false,
        likesCount: 74
      }
    ]);

    // 5. Gallery
    await Gallery.insertMany([
      { title: 'Bridal Lotus Motif Maggam Neckline', category: 'Maggam Work', imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80', caption: 'Intricate lotus work stitched on scarlet kanchi silk', isFeatured: true, order: 1 },
      { title: 'Royal Maroon Velvet Lehenga Flares', category: 'Lehenga', imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80', caption: '16 Kali flare with heavy double can-can setup', isFeatured: true, order: 2 },
      { title: 'Princess Cut Embroidered Blouse Fit', category: 'Blouse', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80', caption: 'Impeccable back cut and gold piped finishing', isFeatured: true, order: 3 },
      { title: 'Blush Pink Organza Reception Frock', category: 'Frock', imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80', caption: 'Draped umbrella flare converted from mother heirloom saree', isFeatured: true, order: 4 },
      { title: 'Traditional Teen Pattu Pavada', category: 'Langa', imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80', caption: 'Gold zari borders with comfort cotton lining', isFeatured: false, order: 5 },
      { title: 'Contemporary Festive Kurti Set', category: 'Kurti', imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80', caption: 'Boutique fit with delicate button loop detailing', isFeatured: false, order: 6 },
      { title: 'School Pinafore & White Blouse Uniform', category: 'Uniform', imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80', caption: 'Box pleated school uniform with neat stitching', isFeatured: false, order: 7 },
      { title: 'Handmade Silk Thread Latkan Tassels', category: 'Custom Designs', imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80', caption: 'Custom crafted latkans for bridal dori', isFeatured: true, order: 8 }
    ]);

    // 6. Videos
    await Video.insertMany([
      {
        title: 'Behind the Seams: The Art of Maggam Embroidery',
        category: 'Maggam Work',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-with-a-needle-41716-large.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
        description: 'Watch our master artisan stitch microscopic pearl beads and zardozi wires onto bridal raw silk.',
        duration: '1:45',
        isPublished: true,
        tags: ['Embroidery', 'Aari Work', 'Craftsmanship']
      },
      {
        title: 'Master Tailor Cutting & Drafting a Princess Cut Blouse',
        category: 'Stitching Process',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-designer-cutting-fabric-in-an-atelier-42845-large.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
        description: 'See the anatomical precision behind our zero-wrinkle princess cut drafting.',
        duration: '2:10',
        isPublished: true,
        tags: ['Pattern Drafting', 'Blouse Fit', 'Cutting']
      },
      {
        title: 'Transformation: Plain Silk Saree into a 360° Flared Gown',
        category: 'Before / After',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-in-a-traditional-dress-smiling-41804-large.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80',
        description: 'Watch how an unworn Kanjeevaram saree becomes an enchanting floor length evening frock.',
        duration: '1:20',
        isPublished: true,
        tags: ['Upcycle', 'Saree To Dress', 'Before After']
      },
      {
        title: 'Bridal Showcase: Crimson Heritage Lehenga in Motion',
        category: 'Design Showcase',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-in-a-traditional-indian-dress-41800-large.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80',
        description: 'Experience the twirl volume and light play on heavy golden zardozi embroidery.',
        duration: '0:55',
        isPublished: true,
        tags: ['Bridal', 'Lehenga Twirl', 'Showcase']
      }
    ]);

    // 7. Testimonials
    await Testimonial.insertMany([
      {
        clientName: 'Sravani Rao',
        location: 'Banjara Hills, Hyderabad',
        occasion: 'Sister’s Wedding Reception',
        rating: 5,
        reviewText: 'RK Stitches did absolute magic with my wedding blouse and lehenga! The fitting was 100% spot-on in the first trial itself with zero alterations needed. Their maggam work detailing got so many compliments!',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        isFeatured: true,
        order: 1
      },
      {
        clientName: 'Pooja Kulkarni',
        location: 'Madhapur, Hyderabad',
        occasion: 'Festive Saree Conversion',
        rating: 5,
        reviewText: 'I handed over my mom’s 25-year-old silk saree to convert into a long frock. What they created exceeded all my expectations! Super neat finishing, soft lining, and quick delivery right on time.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        isFeatured: true,
        order: 2
      },
      {
        clientName: 'Dr. Radhika Sharma',
        location: 'Gachibowli, Hyderabad',
        occasion: 'Office & Everyday Kurtis',
        rating: 5,
        reviewText: 'Finding a tailor who respects your time and understands modern necklines is so rare. RK Stitches is now my permanent go-to. Their online booking tracker keeps you so stress-free!',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        isFeatured: true,
        order: 3
      }
    ]);

    // 8. FAQs
    await FAQ.insertMany([
      {
        question: 'How do I take or submit my measurements?',
        answer: 'You can either input your measurements using our online Measurement Profile tool (with clear visual guides for shoulder, bust, waist, and sleeve lengths), submit an existing well-fitting sample garment at our boutique, or book a home measurement visit.',
        category: 'Measurements',
        order: 1
      },
      {
        question: 'What is the typical turnaround time for custom stitching?',
        answer: 'Standard blouses and kurtis take 3-4 business days. Bridal lehengas and heavy maggam work usually require 7-12 business days. We also offer express 48-hour delivery for urgent occasions upon request.',
        category: 'Delivery',
        order: 2
      },
      {
        question: 'Can you customize maggam work designs from Instagram/Pinterest pictures?',
        answer: 'Yes! You can upload your reference photos or sketches directly in our Custom Stitching booking form. Our master artist will adapt the artwork to your exact neckline and fabric dimensions.',
        category: 'Maggam Work',
        order: 3
      },
      {
        question: 'Do you provide fabric or should I bring my own material?',
        answer: 'Both! You can provide your own fabric or saree, or select from our curated boutique collection of pure silk, organza, georgette, and cotton fabrics. We also source matching linings, laces, and latkans.',
        category: 'Custom Designs',
        order: 4
      },
      {
        question: 'What happens if the outfit requires minor fitting adjustments?',
        answer: 'We provide complimentary alterations on all garments stitched by us! Every piece is cut with generous 1.5 to 2 inch side margins inside so it can easily be altered in the future.',
        category: 'Alterations',
        order: 5
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept UPI (Google Pay, PhonePe, Paytm), cash at boutique pickup, credit/debit cards, and bank transfers. An advance of 50% is taken at booking confirmation with the remaining balance due upon trial and delivery.',
        category: 'Payments',
        order: 6
      }
    ]);

    // 9. Coupons
    await Coupon.insertMany([
      {
        code: 'WELCOME10',
        description: '10% discount on your first custom stitching order',
        discountType: 'PERCENTAGE',
        discountAmount: 10,
        minOrderAmount: 800,
        maxDiscount: 300,
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        usageLimit: 500,
        isActive: true
      },
      {
        code: 'BRIDAL500',
        description: 'Flat ₹500 off on bridal lehenga & maggam work orders',
        discountType: 'FIXED',
        discountAmount: 500,
        minOrderAmount: 3000,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        usageLimit: 100,
        isActive: true
      },
      {
        code: 'FESTIVE15',
        description: 'Special 15% festive discount on all long frocks and langas',
        discountType: 'PERCENTAGE',
        discountAmount: 15,
        minOrderAmount: 1200,
        maxDiscount: 600,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        usageLimit: 200,
        isActive: true
      }
    ]);

    // 10. Sample Customer Measurement Profile
    const savedMeasurement = await Measurement.create({
      user: customerUser._id,
      profileTitle: 'Bridal Blouse Perfect Fit',
      clothingType: 'Blouse',
      unit: 'inches',
      shoulder: 14.5,
      chest: 36,
      waist: 30,
      hip: 38,
      sleeveLength: 10.5,
      armhole: 16,
      sleeveRound: 11.5,
      blouseLength: 14,
      frontNeckDepth: 6.5,
      backNeckDepth: 9.5,
      neckType: 'Sweetheart Front / Deep U Back',
      customNotes: 'Padded cups required. Dori and tassels on back.',
      isDefault: true
    });

    // 11. Sample Bookings for Demo Customer
    await Booking.create([
      {
        bookingNumber: 'RK-2609-8421',
        user: customerUser._id,
        customerName: 'Ananya Reddy',
        customerPhone: '+919812345678',
        customerEmail: 'ananya@example.com',
        clothingType: 'Maggam Work Blouse',
        service: services[1]._id,
        serviceName: 'Handcrafted Maggam & Aari Work',
        savedMeasurementProfile: savedMeasurement._id,
        measurementsSnapshot: {
          shoulder: 14.5,
          chest: 36,
          waist: 30,
          sleeveLength: 10.5,
          armhole: 16,
          blouseLength: 14,
          frontNeckDepth: 6.5,
          backNeckDepth: 9.5,
          neckType: 'Sweetheart Front / Deep U Back'
        },
        fabricStatus: 'CUSTOMER_PROVIDED',
        fabricDetails: 'Pure Raw Silk in Royal Blue with Zari Border',
        color: 'Royal Blue & Gold',
        quantity: 1,
        requiredDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        additionalInstructions: 'Please add peacock border motif on sleeves and pearl latkans.',
        status: 'IN_PROGRESS',
        timeline: [
          { status: 'PENDING', title: 'Booking Request Submitted', note: 'Customer booked via website.', updatedBy: 'System', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
          { status: 'CONFIRMED', title: 'Booking Confirmed by Tailor', note: 'Fabric received and inspected. Flawless raw silk.', updatedBy: 'RK Master Tailor', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
          { status: 'IN_PROGRESS', title: 'Stitching and Crafting Started', note: 'Artisans currently applying zardozi and bead handwork.', updatedBy: 'RK Master Tailor', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
        ],
        assignedStaff: 'Master Ramesh',
        estimatedCost: 3800,
        advancePaid: 2000,
        paymentStatus: 'PARTIAL',
        pickupType: 'BOUTIQUE_PICKUP'
      },
      {
        bookingNumber: 'RK-2609-5192',
        user: customerUser._id,
        customerName: 'Ananya Reddy',
        customerPhone: '+919812345678',
        customerEmail: 'ananya@example.com',
        clothingType: 'Long Frock',
        service: services[3]._id,
        serviceName: 'Designer Long Frocks & Gowns',
        fabricStatus: 'CUSTOMER_PROVIDED',
        fabricDetails: 'Organza floral saree with border',
        color: 'Dusty Pink & Sage Green',
        quantity: 1,
        requiredDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
        timeline: [
          { status: 'PENDING', title: 'Booking Created', note: 'Online submission', updatedBy: 'System', timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) },
          { status: 'CONFIRMED', title: 'Confirmed', note: 'Design confirmed', updatedBy: 'RK Master Tailor', timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },
          { status: 'IN_PROGRESS', title: 'Stitching', note: 'Pleated umbrella cut drafting', updatedBy: 'Master Ramesh', timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
          { status: 'READY', title: 'Ready for Trial', note: 'Quality check passed', updatedBy: 'RK Master Tailor', timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000) },
          { status: 'COMPLETED', title: 'Delivered', note: 'Customer loved the fit and twirl', updatedBy: 'RK Master Tailor', timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) }
        ],
        assignedStaff: 'Master Ramesh',
        estimatedCost: 2200,
        advancePaid: 2200,
        paymentStatus: 'PAID',
        pickupType: 'BOUTIQUE_PICKUP'
      }
    ]);

    // 12. Settings
    await Setting.create({
      businessName: 'RK STITCHES',
      tagline: 'Exclusive Tailoring & Designer Studio for Women & Kids',
      phone: '+91 98765 43210',
      whatsapp: '+919876543210',
      email: 'contact@rkstitches.com',
      address: {
        street: 'Plot 42, Road No 10, Near City Center Mall, Banjara Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500034',
        googleMapsUrl: 'https://maps.google.com'
      },
      businessHours: {
        weekdays: '10:00 AM - 9:00 PM',
        weekends: '10:30 AM - 8:30 PM'
      },
      socialLinks: {
        instagram: 'https://instagram.com/rkstitches_official',
        facebook: 'https://facebook.com/rkstitches',
        youtube: 'https://youtube.com/@rkstitches',
        whatsapp: 'https://wa.me/919876543210'
      },
      heroHeading: 'Master Tailoring & Haute Couture Embroidery',
      heroSubheading: 'From regal bridal lehengas and intricate maggam work blouses to contemporary everyday silhouettes, we stitch your dreams with impeccable precision.'
    });

    console.log('✅ Seed data created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
