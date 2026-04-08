export interface Brand {
  name: string;
  slug: string;
  logo: string;
  daysMin: number;
  daysMax: number;
  price: number;
  docs: string[];
  featured?: boolean;
}

export const brands: Brand[] = [
  // Principais marcas
  { name: "Audi", slug: "audi", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Audi_logo_detail.svg", price: 185, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"], featured: true },
  { name: "BMW", slug: "bmw", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", price: 205, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"], featured: true },
  { name: "Citroën", slug: "citroen", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Citro%C3%ABn_2021.svg", price: 180, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"], featured: true },
  { name: "Ford", slug: "ford", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg", price: 220, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"], featured: true },
  { name: "Mercedes-Benz", slug: "mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Mercedes-Benz_logo.svg", price: 295, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"], featured: true },
  { name: "Peugeot", slug: "peugeot", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Peugeot_logo.svg", price: 180, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"], featured: true },
  { name: "Renault", slug: "renault", logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Renault_Logo.svg", price: 275, daysMin: 15, daysMax: 20, docs: ["Certificado de matrícula"], featured: true },
  { name: "Volkswagen", slug: "volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg", price: 185, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"], featured: true },

  // Restantes marcas (ordenadas alfabeticamente)
  { name: "Alfa Romeo & Lancia", slug: "alfa-romeo", logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Alfa_Romeo_logo.png", price: 265, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula", "Fotos", "Gravação motor", "Chapa fabricante"] },
  { name: "Cupra", slug: "cupra", logo: "/logos/coc/cupra.svg", price: 190, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula", "Cc"] },
  { name: "Dacia", slug: "dacia", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Dacia-Logo-2021.svg", price: 275, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"] },
  { name: "Fiat", slug: "fiat", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/Fiat_Automobiles_logo.svg", price: 225, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula", "Fotos", "Gravação motor", "Chapa fabricante"] },
  { name: "Honda", slug: "honda", logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Honda_logo.svg", price: 275, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"] },
  { name: "Hyundai", slug: "hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg", price: 245, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"] },
  { name: "Kia", slug: "kia", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/KIA_logo3.svg", price: 325, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"] },
  { name: "Mazda", slug: "mazda", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mazda_logo.svg", price: 275, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"] },
  { name: "Mini", slug: "mini", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/MINI_logo.svg", price: 205, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"] },
  { name: "Nissan", slug: "nissan", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Nissan_logo.svg", price: 215, daysMin: 15, daysMax: 30, docs: ["Certificado de matrícula", "Chapa fabricante"] },
  { name: "Opel", slug: "opel", logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Opel_logo.svg", price: 205, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"] },
  { name: "Porsche", slug: "porsche", logo: "/logos/coc/porsche-6.svg", price: 345, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"] },
  { name: "Seat", slug: "seat", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/SEAT_Logo_from_2017.svg", price: 190, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"] },
  { name: "Škoda", slug: "skoda", logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/%C5%A0koda_Auto.svg", price: 225, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula"] },
  { name: "Toyota", slug: "toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Toyota_logo.svg", price: 205, daysMin: 5, daysMax: 10, docs: ["Certificado de matrícula"] },
  { name: "Volvo", slug: "volvo", logo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Volvo_logo.svg", price: 195, daysMin: 10, daysMax: 15, docs: ["Certificado de matrícula", "Chapa fabricante"] },
];

export function getBrandLetter(brand: Brand): string {
  const normalized = brand.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return normalized.charAt(0).toUpperCase();
}

export function getAvailableLetters(brandsList: Brand[]): string[] {
  const letters = new Set(brandsList.map(getBrandLetter));
  return Array.from(letters).sort();
}
