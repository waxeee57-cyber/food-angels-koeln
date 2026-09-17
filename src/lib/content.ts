import cateringData from "@/data/catering.json";
import dishesData from "@/data/dishes.json";
import photosData from "@/data/photos.json";
import restaurantData from "@/data/restaurant.json";

export type Photo = (typeof photosData.items)[number];
export type Dish = (typeof dishesData.items)[number];
export type DishCategory = (typeof dishesData.categories)[number];
export type CateringPackage = (typeof cateringData.packages)[number];

export const restaurant = restaurantData;
export const dishes = dishesData;
export const catering = cateringData;
export const photos = photosData;

const photoById = new Map(photosData.items.map((photo) => [photo.id, photo]));

export function getPhoto(id: string): Photo {
  const photo = photoById.get(id);
  if (!photo) {
    throw new Error(`Foto nicht gefunden: ${id}`);
  }
  return photo;
}

export function dishesByCategory(categoryId?: string): Dish[] {
  if (!categoryId) return dishesData.items;
  return dishesData.items.filter((dish) => dish.category === categoryId);
}

export function uniquePhotographers(): Photo[] {
  const seen = new Set<string>();
  return photosData.items.filter((photo) => {
    const key = photo.handle;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function mapsEmbedSrc(): string {
  const { lat, lng } = restaurantData.geo;
  const pad = 0.012;
  const bbox = `${lng - pad},${lat - pad},${lng + pad},${lat + pad}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export function mapsLink(): string {
  const { street, zip, city } = restaurantData.address;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${street}, ${zip} ${city}`)}`;
}

export function fullAddress(): string {
  const { street, zip, city } = restaurantData.address;
  return `${street}, ${zip} ${city}`;
}
