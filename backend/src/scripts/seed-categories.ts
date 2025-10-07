import 'reflect-metadata';
import { Category } from '../category/entities/category.entity';
import { DataSource } from 'typeorm';

// 🧠 adjust these to your DB credentials
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: '',
  entities: [Category],
  synchronize: true, // ❗ keep false in prod
  // logging: false,
});

const categories = [
  { title: 'Electronics', title_ar: 'إلكترونيات' },
  { title: 'Furniture', title_ar: 'أثاث' },
  { title: 'Clothing', title_ar: 'ملابس' },
  { title: 'Books', title_ar: 'كتب' },
  { title: 'Sports', title_ar: 'رياضة' },
  { title: 'Beauty & Health', title_ar: 'الجمال والصحة' },
  { title: 'Home Appliances', title_ar: 'الأجهزة المنزلية' },
  { title: 'Toys & Games', title_ar: 'ألعاب' },
  { title: 'Jewelry & Accessories', title_ar: 'المجوهرات والإكسسوارات' },
  { title: 'Automotive', title_ar: 'السيارات' },
  { title: 'Groceries', title_ar: 'البقالة' },
  { title: 'Music & Instruments', title_ar: 'الموسيقى والآلات' },
  { title: 'Office Supplies', title_ar: 'مستلزمات المكتب' },
  { title: 'Garden & Outdoor', title_ar: 'الحديقة والهواء الطلق' },
  { title: 'Pet Supplies', title_ar: 'مستلزمات الحيوانات الأليفة' },
  { title: 'Shoes', title_ar: 'أحذية' },
  { title: 'Watches', title_ar: 'ساعات' },
  { title: 'Baby Products', title_ar: 'منتجات الأطفال' },
  { title: 'Art & Crafts', title_ar: 'الفنون والحرف اليدوية' },
  { title: 'Home Decor', title_ar: 'ديكور المنزل' },
  { title: 'Cameras & Photography', title_ar: 'الكاميرات والتصوير' },
  { title: 'Travel & Luggage', title_ar: 'السفر والحقائب' },
  { title: 'Health & Personal Care', title_ar: 'الصحة والعناية الشخصية' },
];

async function seedCategories() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const categoryRepo = AppDataSource.getRepository(Category);

    for (const cat of categories) {
      const existing = await categoryRepo.findOne({
        where: [{ title: cat.title }, { title_ar: cat.title_ar }],
      });

      if (existing) {
        continue;
      }

      const newCat = categoryRepo.create(cat);
      await categoryRepo.save(newCat);
      console.log(`✅ Inserted: ${cat.title}`);
    }
  } catch (err) {
    console.error('❌ Error while seeding categories:', err);
  } finally {
    await AppDataSource.destroy();
  }
}

seedCategories();
