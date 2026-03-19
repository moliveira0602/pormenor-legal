interface Brand {
  name: string;
  logo: string;
  popular?: boolean;
}

const brands: Brand[] = [
  // Popular brands first
  { name: "BMW", logo: "/brands/bmw.svg", popular: true },
  { name: "Mercedes", logo: "/brands/mercedes.svg", popular: true },
  { name: "Audi", logo: "/brands/audi.svg", popular: true },
  { name: "Volkswagen", logo: "/brands/volkswagen.svg", popular: true },
  { name: "Toyota", logo: "/brands/toyota.svg", popular: true },
  { name: "Tesla", logo: "/brands/tesla.svg", popular: true },
  
  // Alphabetical order
  { name: "Alfa Romeo", logo: "/brands/alfa-romeo.svg" },
  { name: "Citroën", logo: "/brands/citroen.svg" },
  { name: "Ferrari", logo: "/brands/ferrari.svg" },
  { name: "Ford", logo: "/brands/ford.svg" },
  { name: "Honda", logo: "/brands/honda.svg" },
  { name: "Hyundai", logo: "/brands/hyundai.svg" },
  { name: "Jaguar", logo: "/brands/jaguar.svg" },
  { name: "Jeep", logo: "/brands/jeep.svg" },
  { name: "Kia", logo: "/brands/kia.svg" },
  { name: "Lexus", logo: "/brands/lexus.svg" },
  { name: "Mazda", logo: "/brands/mazda.svg" },
  { name: "Nissan", logo: "/brands/nissan.svg" },
  { name: "Peugeot", logo: "/brands/peugeot.svg" },
  { name: "Porsche", logo: "/brands/porsche.svg" },
  { name: "Renault", logo: "/brands/renault.svg" },
  { name: "Seat", logo: "/brands/seat.svg" },
  { name: "Skoda", logo: "/brands/skoda.svg" },
  { name: "Subaru", logo: "/brands/subaru.svg" },
  { name: "Suzuki", logo: "/brands/suzuki.svg" },
  { name: "Volvo", logo: "/brands/volvo.svg" },
];

interface VehicleBrandSelectionProps {
  selectedBrand?: string;
  onSelectBrand: (brand: string) => void;
}

export default function VehicleBrandSelection({ selectedBrand, onSelectBrand }: VehicleBrandSelectionProps) {
  const popularBrands = brands.filter(b => b.popular);
  const otherBrands = brands.filter(b => !b.popular).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-8">
      {/* Popular Brands */}
      <div>
        <h3 className="font-display font-bold text-navy text-lg mb-4">Marcas Populares</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularBrands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onSelectBrand(brand.name)}
              className={`p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
                selectedBrand === brand.name
                  ? "border-primary bg-primary/5"
                  : "border-[var(--border)] hover:border-primary/50"
              }`}
            >
              <div className="w-full h-16 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                />
              </div>
              <p className="text-center text-sm font-medium mt-2 text-navy">{brand.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Other Brands */}
      <div>
        <h3 className="font-display font-bold text-navy text-lg mb-4">Outras Marcas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {otherBrands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onSelectBrand(brand.name)}
              className={`p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
                selectedBrand === brand.name
                  ? "border-primary bg-primary/5"
                  : "border-[var(--border)] hover:border-primary/50"
              }`}
            >
              <div className="w-full h-16 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                />
              </div>
              <p className="text-center text-sm font-medium mt-2 text-navy">{brand.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}