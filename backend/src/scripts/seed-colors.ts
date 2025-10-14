import 'reflect-metadata';
import { Color } from '../colors/entities/color.entity';
import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Size } from '../sizes/entities/size.entity';
import { Category } from '../category/entities/category.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'ecommerce',

  entities: [Category, Product, Color, Size],
  synchronize: true,
  logging: false,
});
const colors = [
  { name: 'Coral Sunset', name_ar: 'غروب المرجان', color: '#FF6F61' },
  { name: 'Mint Leaf', name_ar: 'ورقة النعناع', color: '#00B894' },
  { name: 'Royal Blue', name_ar: 'أزرق ملكي', color: '#4169E1' },
  { name: 'Amber Glow', name_ar: 'توَهُّج الكهرمان', color: '#FFBF00' },
  { name: 'Lavender Mist', name_ar: 'ضباب الخزامى', color: '#CBAACB' },
  { name: 'Emerald Sea', name_ar: 'بحر الزمرد', color: '#2E8B57' },
  { name: 'Slate Gray', name_ar: 'رمادي أردوازي', color: '#708090' },
  { name: 'Crimson Rose', name_ar: 'وردة قرمزية', color: '#DC143C' },
  { name: 'Ocean Teal', name_ar: 'أزرق محيطي', color: '#008B8B' },
  { name: 'Sunset Peach', name_ar: 'خوخ الغروب', color: '#FF9E80' },
  { name: 'Olive Grove', name_ar: 'بستان الزيتون', color: '#808000' },
  { name: 'Sapphire Sky', name_ar: 'سماء الزفير', color: '#0F52BA' },
  { name: 'Deep Plum', name_ar: 'برقوق غامق', color: '#580F41' },
  { name: 'Frosted Jade', name_ar: 'يشم متجمد', color: '#77DD77' },
  { name: 'Copper Dust', name_ar: 'غبار نحاسي', color: '#B87333' },
  { name: 'Rosewood', name_ar: 'خشب الورد', color: '#65000B' },
  { name: 'Arctic Blue', name_ar: 'أزرق قطبي', color: '#A7C7E7' },
  { name: 'Golden Sand', name_ar: 'رمال ذهبية', color: '#FFD700' },
  { name: 'Charcoal', name_ar: 'فحم', color: '#36454F' },
  { name: 'Velvet Purple', name_ar: 'أرجواني مخملي', color: '#800080' },
  { name: 'Pearl White', name_ar: 'أبيض لؤلؤي', color: '#F8F8FF' },
  { name: 'Midnight Green', name_ar: 'أخضر ليلي', color: '#004953' },
  { name: 'Burnt Sienna', name_ar: 'سيينا محروقة', color: '#E97451' },
  { name: 'Steel Blue', name_ar: 'أزرق فولاذي', color: '#4682B4' },
  { name: 'Champagne Pink', name_ar: 'وردي شامبانيا', color: '#F7E7CE' },
  { name: 'Mocha Mist', name_ar: 'ضباب الموكا', color: '#BFA6A0' },
  { name: 'Forest Moss', name_ar: 'طحلب الغابة', color: '#556B2F' },
  { name: 'Cobalt Dream', name_ar: 'كوبالت الحلم', color: '#0047AB' },
  { name: 'Ruby Flame', name_ar: 'لهب الياقوت', color: '#E0115F' },
  { name: 'Ivory Cream', name_ar: 'عاجي كريمي', color: '#FFF8E7' },
];
async function seedColors() {
  try {
    await AppDataSource.initialize();

    const colorRepo = AppDataSource.getRepository(Color);

    for (const color of colors) {
      const existing = await colorRepo.findOne({
        where: [{ name: color.name }, { color: color.color }],
      });

      if (existing) {
        continue;
      }

      const newColor = colorRepo.create(color);
      await colorRepo.save(newColor);
    }
  } catch (err) {
    console.error('❌ Error while seeding colors:', err);
  } finally {
    await AppDataSource.destroy();
  }
}

seedColors();
