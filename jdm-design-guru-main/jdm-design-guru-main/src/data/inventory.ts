import carSkyline from "@/assets/car-skyline.jpg";
import car240z from "@/assets/car-240z.jpg";
import carSupra from "@/assets/car-supra.jpg";
import carRx7 from "@/assets/car-rx7.jpg";

export type VehicleStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export interface Vehicle {
  id: string;
  img: string;
  name: string;
  chassis: string;
  year: number;
  priceGBP: number;
  priceLabel: string;
  mileage: string;
  mileageKm: number;
  grade: string;
  transmission: string;
  displacementCc: number;
  displacementLabel: string;
  status: VehicleStatus;
  featured?: boolean;
}

export const inventory: Vehicle[] = [
  {
    id: "bnr32-1992",
    img: carSkyline,
    name: "Nissan Skyline GT-R",
    chassis: "BNR32",
    year: 1992,
    priceGBP: 58500,
    priceLabel: "£58,500",
    mileage: "78,400 km",
    mileageKm: 78400,
    grade: "Auction Grade 4",
    transmission: "5-Speed Manual",
    displacementCc: 2568,
    displacementLabel: "2.6L Twin-Turbo",
    status: "AVAILABLE",
    featured: true,
  },
  {
    id: "s30-1973",
    img: car240z,
    name: "Nissan Fairlady Z",
    chassis: "S30 240Z",
    year: 1973,
    priceGBP: 62000,
    priceLabel: "£62,000",
    mileage: "112,000 km",
    mileageKm: 112000,
    grade: "Restored",
    transmission: "4-Speed Manual",
    displacementCc: 2393,
    displacementLabel: "2.4L Inline-6",
    status: "RESERVED",
  },
  {
    id: "jza80-1995",
    img: carSupra,
    name: "Toyota Supra RZ",
    chassis: "JZA80 MK4",
    year: 1995,
    priceGBP: 89750,
    priceLabel: "£89,750",
    mileage: "64,200 km",
    mileageKm: 64200,
    grade: "Auction Grade 4.5",
    transmission: "6-Speed Getrag",
    displacementCc: 2997,
    displacementLabel: "3.0L Twin-Turbo",
    status: "AVAILABLE",
  },
  {
    id: "fd3s-1994",
    img: carRx7,
    name: "Mazda RX-7 Type R",
    chassis: "FD3S",
    year: 1994,
    priceGBP: 42900,
    priceLabel: "£42,900",
    mileage: "95,800 km",
    mileageKm: 95800,
    grade: "Auction Grade 4",
    transmission: "5-Speed Manual",
    displacementCc: 1308,
    displacementLabel: "1.3L Twin-Rotor",
    status: "SOLD",
  },
  {
    id: "bnr34-1999",
    img: carSkyline,
    name: "Nissan Skyline GT-R V-Spec",
    chassis: "BNR34",
    year: 1999,
    priceGBP: 145000,
    priceLabel: "£145,000",
    mileage: "52,300 km",
    mileageKm: 52300,
    grade: "Auction Grade 4.5",
    transmission: "6-Speed Getrag",
    displacementCc: 2568,
    displacementLabel: "2.6L Twin-Turbo",
    status: "AVAILABLE",
  },
  {
    id: "ae86-1985",
    img: car240z,
    name: "Toyota Sprinter Trueno",
    chassis: "AE86",
    year: 1985,
    priceGBP: 31500,
    priceLabel: "£31,500",
    mileage: "143,700 km",
    mileageKm: 143700,
    grade: "Auction Grade 3.5",
    transmission: "5-Speed Manual",
    displacementCc: 1587,
    displacementLabel: "1.6L Inline-4",
    status: "AVAILABLE",
  },
];

export const statusStyles: Record<VehicleStatus, string> = {
  AVAILABLE:
    "bg-success/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
  RESERVED: "bg-primary/15 text-bronze border-primary/40",
  SOLD: "bg-destructive/15 text-[hsl(var(--destructive))] border-[hsl(var(--destructive))]/40",
};
