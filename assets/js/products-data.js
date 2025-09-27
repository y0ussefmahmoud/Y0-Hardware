// ===== Products Database =====
const productsDatabase = [
    // PC Parts - Processors
    {
        id: 1,
        name: "معالج Intel Core i9-13900K",
        category: "pc-parts",
        subcategory: "processors",
        brand: "intel",
        price: 18999,
        oldPrice: 21999,
        rating: 5,
        reviewCount: 45,
        image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop",
        badge: "new",
        inStock: true,
        description: "معالج Intel Core i9 الجيل الثالث عشر بـ 24 نواة و 32 خيط معالجة",
        specifications: {
            cores: "24 نواة",
            threads: "32 خيط",
            baseFreq: "3.0 GHz",
            boostFreq: "5.8 GHz",
            cache: "36 MB",
            socket: "LGA 1700"
        }
    },
    {
        id: 2,
        name: "معالج AMD Ryzen 9 7900X",
        category: "pc-parts",
        subcategory: "processors",
        brand: "amd",
        price: 16499,
        oldPrice: 18999,
        rating: 5,
        reviewCount: 38,
        image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "معالج AMD Ryzen 9 بتقنية 5nm وأداء استثنائي للألعاب",
        specifications: {
            cores: "12 نواة",
            threads: "24 خيط",
            baseFreq: "4.7 GHz",
            boostFreq: "5.6 GHz",
            cache: "76 MB",
            socket: "AM5"
        }
    },

    // PC Parts - Graphics Cards
    {
        id: 3,
        name: "كارت شاشة NVIDIA RTX 4080",
        category: "pc-parts",
        subcategory: "graphics-cards",
        brand: "nvidia",
        price: 35999,
        oldPrice: 39999,
        rating: 5,
        reviewCount: 67,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "كارت شاشة RTX 4080 بذاكرة 16GB GDDR6X للألعاب بدقة 4K",
        specifications: {
            memory: "16GB GDDR6X",
            memoryBus: "256-bit",
            coreClock: "2205 MHz",
            boostClock: "2505 MHz",
            rtCores: "76",
            tensorCores: "304"
        }
    },
    {
        id: 4,
        name: "كارت شاشة AMD RX 7800 XT",
        category: "pc-parts",
        subcategory: "graphics-cards",
        brand: "amd",
        price: 28999,
        oldPrice: 32999,
        rating: 4,
        reviewCount: 42,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "كارت شاشة AMD Radeon RX 7800 XT بأداء ممتاز للألعاب",
        specifications: {
            memory: "16GB GDDR6",
            memoryBus: "256-bit",
            gameClock: "2124 MHz",
            boostClock: "2430 MHz",
            streamProcessors: "3840",
            rayAccelerators: "60"
        }
    },

    // PC Parts - Motherboards
    {
        id: 5,
        name: "لوحة أم ASUS ROG Strix Z790-E",
        category: "pc-parts",
        subcategory: "motherboards",
        brand: "asus",
        price: 12999,
        oldPrice: 14999,
        rating: 5,
        reviewCount: 29,
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
        badge: "new",
        inStock: true,
        description: "لوحة أم ASUS ROG Strix بمقبس LGA 1700 ودعم DDR5",
        specifications: {
            socket: "LGA 1700",
            chipset: "Intel Z790",
            memoryType: "DDR5",
            maxMemory: "128GB",
            pciSlots: "4x PCIe 5.0",
            sataConnectors: "6"
        }
    },

    // PC Parts - RAM
    {
        id: 6,
        name: "ذاكرة Corsair Vengeance DDR5 32GB",
        category: "pc-parts",
        subcategory: "memory",
        brand: "corsair",
        price: 8999,
        oldPrice: 10999,
        rating: 5,
        reviewCount: 56,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "ذاكرة DDR5 عالية الأداء بسرعة 5600MHz",
        specifications: {
            capacity: "32GB (2x16GB)",
            type: "DDR5",
            speed: "5600MHz",
            latency: "CL36",
            voltage: "1.25V",
            heatspreader: "نعم"
        }
    },

    // Laptops - Gaming
    {
        id: 7,
        name: "لابتوب ASUS ROG Strix G15",
        category: "laptops",
        subcategory: "gaming",
        brand: "asus",
        price: 45999,
        oldPrice: 52999,
        rating: 5,
        reviewCount: 78,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "لابتوب ألعاب ASUS ROG بمعالج AMD Ryzen 9 وكارت RTX 4070",
        specifications: {
            processor: "AMD Ryzen 9 7940HS",
            graphics: "NVIDIA RTX 4070 8GB",
            memory: "32GB DDR5",
            storage: "1TB NVMe SSD",
            display: "15.6\" QHD 165Hz",
            battery: "90Wh"
        }
    },
    {
        id: 8,
        name: "لابتوب MSI Katana 15",
        category: "laptops",
        subcategory: "gaming",
        brand: "msi",
        price: 38999,
        oldPrice: 42999,
        rating: 4,
        reviewCount: 34,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
        badge: "new",
        inStock: true,
        description: "لابتوب ألعاب MSI بمعالج Intel Core i7 وكارت RTX 4060",
        specifications: {
            processor: "Intel Core i7-13620H",
            graphics: "NVIDIA RTX 4060 8GB",
            memory: "16GB DDR5",
            storage: "512GB NVMe SSD",
            display: "15.6\" FHD 144Hz",
            battery: "53.5Wh"
        }
    },

    // Laptops - Business
    {
        id: 9,
        name: "لابتوب Dell XPS 13",
        category: "laptops",
        subcategory: "business",
        brand: "dell",
        price: 32999,
        oldPrice: 36999,
        rating: 5,
        reviewCount: 89,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "لابتوب Dell XPS 13 المحمول بمعالج Intel Core i7 الجيل الثالث عشر",
        specifications: {
            processor: "Intel Core i7-1360P",
            graphics: "Intel Iris Xe",
            memory: "16GB LPDDR5",
            storage: "512GB NVMe SSD",
            display: "13.4\" FHD+ Touch",
            battery: "55Wh"
        }
    },

    // Accessories - Keyboards
    {
        id: 10,
        name: "لوحة مفاتيح Corsair K95 RGB",
        category: "accessories",
        subcategory: "keyboards",
        brand: "corsair",
        price: 2499,
        oldPrice: 2999,
        rating: 5,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
        badge: "bestseller",
        inStock: true,
        description: "لوحة مفاتيح ميكانيكية RGB مع مفاتيح Cherry MX",
        specifications: {
            switchType: "Cherry MX Speed",
            backlight: "RGB Per-Key",
            connectivity: "USB-C",
            layout: "Full Size",
            macroKeys: "6",
            mediaControls: "نعم"
        }
    },
    {
        id: 11,
        name: "لوحة مفاتيح Razer BlackWidow V4",
        category: "accessories",
        subcategory: "keyboards",
        brand: "razer",
        price: 3299,
        oldPrice: 3799,
        rating: 5,
        reviewCount: 92,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
        badge: "new",
        inStock: true,
        description: "لوحة مفاتيح Razer الميكانيكية مع مفاتيح Green التكتيكية",
        specifications: {
            switchType: "Razer Green",
            backlight: "Razer Chroma RGB",
            connectivity: "USB-A",
            layout: "Full Size",
            macroKeys: "5",
            wristRest: "نعم"
        }
    },

    // Accessories - Mice
    {
        id: 12,
        name: "فأرة Logitech G Pro X Superlight",
        category: "accessories",
        subcategory: "mice",
        brand: "logitech",
        price: 1899,
        oldPrice: 2199,
        rating: 5,
        reviewCount: 234,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        badge: "bestseller",
        inStock: true,
        description: "فأرة ألعاب لاسلكية خفيفة الوزن مع حساس HERO 25K",
        specifications: {
            sensor: "HERO 25K",
            dpi: "25,600 DPI",
            weight: "63g",
            connectivity: "LIGHTSPEED Wireless",
            battery: "70 ساعة",
            buttons: "5"
        }
    },

    // Accessories - Headsets
    {
        id: 13,
        name: "سماعة SteelSeries Arctis 7P",
        category: "accessories",
        subcategory: "headsets",
        brand: "steelseries",
        price: 2799,
        oldPrice: 3299,
        rating: 4,
        reviewCount: 167,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "سماعة ألعاب لاسلكية مع صوت محيطي 7.1",
        specifications: {
            connectivity: "2.4GHz Wireless",
            frequency: "20-20,000 Hz",
            battery: "24 ساعة",
            microphone: "ClearCast Bidirectional",
            compatibility: "PC, PS5, PS4",
            weight: "308g"
        }
    },

    // Accessories - Monitors
    {
        id: 14,
        name: "شاشة ASUS ROG Swift PG279QM",
        category: "accessories",
        subcategory: "monitors",
        brand: "asus",
        price: 18999,
        oldPrice: 21999,
        rating: 5,
        reviewCount: 43,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
        badge: "new",
        inStock: true,
        description: "شاشة ألعاب 27 بوصة QHD بمعدل تحديث 240Hz",
        specifications: {
            size: "27 بوصة",
            resolution: "2560x1440 (QHD)",
            refreshRate: "240Hz",
            responseTime: "1ms",
            panelType: "Fast IPS",
            gsync: "G-SYNC Compatible"
        }
    },

    // PC Parts - Storage
    {
        id: 15,
        name: "قرص Samsung 980 PRO NVMe 2TB",
        category: "pc-parts",
        subcategory: "storage",
        brand: "samsung",
        price: 6999,
        oldPrice: 7999,
        rating: 5,
        reviewCount: 78,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "قرص SSD NVMe عالي السرعة بسعة 2TB",
        specifications: {
            capacity: "2TB",
            interface: "PCIe 4.0 x4",
            formFactor: "M.2 2280",
            readSpeed: "7,000 MB/s",
            writeSpeed: "6,900 MB/s",
            warranty: "5 سنوات"
        }
    },

    // PC Parts - Power Supply
    {
        id: 16,
        name: "مزود طاقة Corsair RM850x",
        category: "pc-parts",
        subcategory: "power-supply",
        brand: "corsair",
        price: 4999,
        oldPrice: 5499,
        rating: 5,
        reviewCount: 89,
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
        badge: "new",
        inStock: true,
        description: "مزود طاقة 850W بكفاءة 80+ Gold وتصميم مودولار",
        specifications: {
            wattage: "850W",
            efficiency: "80+ Gold",
            modular: "Full Modular",
            fan: "135mm",
            warranty: "10 سنوات",
            cables: "All Black Sleeved"
        }
    },

    // Accessories - Webcams
    {
        id: 17,
        name: "كاميرا ويب Logitech C920s HD Pro",
        category: "accessories",
        subcategory: "webcams",
        brand: "logitech",
        price: 1299,
        oldPrice: 1499,
        rating: 4,
        reviewCount: 145,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "كاميرا ويب بدقة Full HD مع ميكروفون مدمج",
        specifications: {
            resolution: "1080p/30fps",
            fieldOfView: "78°",
            autofocus: "نعم",
            microphone: "Dual Stereo",
            compatibility: "Windows, Mac, Chrome OS",
            mount: "Universal Clip"
        }
    },

    // PC Parts - Cases
    {
        id: 18,
        name: "كيس Fractal Design Meshify C",
        category: "pc-parts",
        subcategory: "cases",
        brand: "fractal-design",
        price: 3499,
        oldPrice: 3999,
        rating: 5,
        reviewCount: 67,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop",
        badge: "new",
        inStock: true,
        description: "كيس كمبيوتر بتصميم Mesh للتهوية المثلى",
        specifications: {
            formFactor: "Mid Tower",
            motherboardSupport: "ATX, mATX, Mini-ITX",
            maxGpuLength: "315mm",
            maxCpuCooler: "170mm",
            fans: "2x 120mm Front, 1x 120mm Rear",
            radiatorSupport: "280mm Front, 140mm Rear"
        }
    },

    // More products to reach 24 total
    {
        id: 19,
        name: "معالج Intel Core i5-13600K",
        category: "pc-parts",
        subcategory: "processors",
        brand: "intel",
        price: 12999,
        oldPrice: 14999,
        rating: 5,
        reviewCount: 67,
        image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop",
        badge: "bestseller",
        inStock: true,
        description: "معالج Intel Core i5 الجيل الثالث عشر بأداء ممتاز للألعاب",
        specifications: {
            cores: "14 نواة",
            threads: "20 خيط",
            baseFreq: "3.5 GHz",
            boostFreq: "5.1 GHz",
            cache: "24 MB",
            socket: "LGA 1700"
        }
    },
    {
        id: 20,
        name: "كارت شاشة NVIDIA RTX 4060 Ti",
        category: "pc-parts",
        subcategory: "graphics-cards",
        brand: "nvidia",
        price: 19999,
        oldPrice: 22999,
        rating: 4,
        reviewCount: 89,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop",
        badge: "sale",
        inStock: true,
        description: "كارت شاشة RTX 4060 Ti بذاكرة 16GB للألعاب بدقة 1440p",
        specifications: {
            memory: "16GB GDDR6",
            memoryBus: "128-bit",
            coreClock: "2310 MHz",
            boostClock: "2535 MHz",
            rtCores: "34",
            tensorCores: "136"
        }
    }
];

// Categories mapping
const categories = {
    'all': 'جميع المنتجات',
    'pc-parts': 'قطع الكمبيوتر',
    'laptops': 'اللابتوب',
    'accessories': 'الاكسسوارات'
};

const subcategories = {
    'processors': 'المعالجات',
    'graphics-cards': 'كروت الشاشة',
    'motherboards': 'اللوحات الأم',
    'memory': 'الذاكرة العشوائية',
    'storage': 'وحدات التخزين',
    'power-supply': 'مزودات الطاقة',
    'cases': 'صناديق الكمبيوتر',
    'gaming': 'ألعاب',
    'business': 'أعمال',
    'keyboards': 'لوحات المفاتيح',
    'mice': 'الفئران',
    'headsets': 'السماعات',
    'monitors': 'الشاشات',
    'webcams': 'كاميرات الويب'
};

const brands = {
    'intel': 'Intel',
    'amd': 'AMD',
    'nvidia': 'NVIDIA',
    'asus': 'ASUS',
    'msi': 'MSI',
    'corsair': 'Corsair',
    'dell': 'Dell',
    'razer': 'Razer',
    'logitech': 'Logitech',
    'steelseries': 'SteelSeries',
    'samsung': 'Samsung',
    'fractal-design': 'Fractal Design'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsDatabase, categories, subcategories, brands };
}
