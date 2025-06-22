export interface ICarSpecs {
  acceleration: string
  topSpeed: string
  autonomy: string
}

export interface ICar {
  id: string
  brand: {
    value: string
    label: string
  }
  model: string
  price: number
  image?: string
  availability: string
  inventory: {
    value: 'new' | 'used'
    label: 'Новий' | 'Вживаний'
  }
  concept: {
    value: 'classic' | 'hybrid' | 'electric'
    label: 'Дизель/Бензин' | 'Гібрид' | 'Електро'
  }
  color: {
    value: string
    label: string
  }
  wheelSize: number
  specs: ICarSpecs
  features: string[]
}

export const carsDB: ICar[] = [
  {
    id: "range-rover-velar",
    brand: { value: "land-rover", label: "Land Rover" },
    model: "Velar",
    price: 65000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "gray",
      label: "cірий"
    },
    wheelSize: 20,
    image: "/assets/11.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "224",
      autonomy: "645",
    },
    features: [
      "All Black Premium Interior",
      "Performance Upgrade",
      "Carbon Fiber Spoiler",
    ],
  },
  {
    id: "hyundai-ioniq-5",
    brand: { value: "hyundai", label: "Hyundai" },
    model: "Ioniq 5",
    price: 39000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "electric",
      label: "Електро"
    },
    color: {
      value: "gray",
      label: "cірий"
    },
    wheelSize: 20,
    image: "/assets/7.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.8",
      topSpeed: "175",
      autonomy: "679",
    },
    features: [
      "Midnight Silver Metallic Paint",
      "20” Uberturbine Wheels",
      "Phantom LED Lights",
    ],
  },
  {
    id: "mercedes-gle",
    brand: { value: "mercedes", label: "Mercedes" },
    model: "GLE",
    price: 115000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 20,
    image: "/assets/4.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "3.9",
      topSpeed: "180",
      autonomy: "654",
    },
    features: [
      "Midnight Silver Metallic Paint",
      "20” Uberturbine Wheels",
      "Carbon Fiber Spoiler",
    ],
  },
  {
    id: "jaguar-ftype",
    brand: { value: "jaguar", label: "Jaguar" },
    model: "F-Type",
    price: 110000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "blue",
      label: "синій"
    },
    wheelSize: 20,
    image: "/assets/3.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "1.2",
      topSpeed: "240",
      autonomy: "421",
    },
    features: ["Performance Upgrade", "Carbon Fiber Spoiler"],
  },
  {
    id: "hyundai-santa-fe",
    brand: { value: "hyundai", label: "Hyundai" },
    model: "New Santa Fe",
    price: 58000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 20,
    image: "/assets/6.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: ["Performance Upgrade", "Carbon Fiber Spoiler"],
  },
  {
    id: "bmw-x5",
    brand: { value: "bmw", label: "BMW" },
    model: "X5",
    price: 89000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 20,
    image: "/assets/5.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: [
      "All Black Premium Interior",
      "Performance Upgrade",
      "Carbon Fiber Spoiler",
    ],
  },
  {
    id: "audi-rs8",
    brand: { value: "audi", label: "Audi" },
    model: "RS-8",
    price: 87000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 20,
    image: "/assets/1.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: [
      "Midnight Silver Metallic Paint",
      "20” Uberturbine Wheels",
      "All Black Premium Interior",
      "Performance Upgrade",
      "Carbon Fiber Spoiler",
    ],
  },
  {
    id: "range-rover-evoque",
    brand: { value: "land-rover", label: "Land Rover" },
    model: "Evoque Sport",
    price: 48000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "black",
      label: "чорний"
    },
    wheelSize: 20,
    image: "/assets/2.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: ["Performance Upgrade", "Carbon Fiber Spoiler"],
  },
  {
    id: "mercedes-class-a",
    brand: { value: "mercedes", label: "Mercedes" },
    model: "Class A",
    price: 44000,
    inventory: {
      value: "used",
      label: "Вживаний"
    },
    concept: {
      value: "hybrid",
      label: "Гібрид"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 18,
    image: "/assets/9.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "3.9",
      topSpeed: "115",
      autonomy: "478",
    },
    features: ["Carbon Fiber Spoiler"],
  },
  {
    id: "hyundai-tucson",
    brand: { value: "hyundai", label: "Hyundai" },
    model: "Tucson",
    price: 44000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "hybrid",
      label: "Гібрид"
    },
    color: {
      value: "gray",
      label: "cірий"
    },
    wheelSize: 19,
    image: "/assets/12.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "3.9",
      topSpeed: "115",
      autonomy: "389",
    },
    features: ["Performance Upgrade", "Phantom LED Lights"],
  },
  {
    id: "bmw-x2",
    brand: { value: "bmw", label: "BMW" },
    model: "X2",
    price: 42000,
    inventory: {
      value: "used",
      label: "Вживаний"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "blue",
      label: "синій"
    },
    wheelSize: 20,
    image: "/assets/13.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: ["All Black Premium Interior"],
  },
  {
    id: "audi-rsq8",
    brand: { value: "audi", label: "Audi" },
    model: "RS-Q8",
    price: 145000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "gray",
      label: "cірий"
    },
    wheelSize: 20,
    image: "/assets/14.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: ["Carbon Fiber Spoiler"],
  },
  {
    id: "hyundai-sonata-hybrid",
    brand: { value: "hyundai", label: "Hyundai" },
    model: "Sonata Hybrid",
    price: 44000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "hybrid",
      label: "Гібрид"
    },
    color: {
      value: "gray",
      label: "cірий"
    },
    wheelSize: 18,
    image: "/assets/10.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.2",
      topSpeed: "105",
      autonomy: "420",
    },
    features: ["Phantom LED Lights"],
  },
  {
    id: "jaguar-fpace",
    brand: { value: "jaguar", label: "Jaguar" },
    model: "F-Pace",
    price: 85000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 20,
    image: "/assets/15.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "1.2",
      topSpeed: "135",
      autonomy: "290",
    },
    features: ["Carbon Fiber Spoiler"],
  },
  {
    id: "audi-q5",
    brand: { value: "audi", label: "Audi" },
    model: "Q5",
    price: 65000,
    inventory: {
      value: "used",
      label: "Вживаний"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 20,
    image: "/assets/16.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: ["Carbon Fiber Spoiler"],
  },
  {
    id: "bmw-x1",
    brand: { value: "bmw", label: "BMW" },
    model: "X1",
    price: 55000,
    inventory: {
      value: "new",
      label: "Новий"
    },
    concept: {
      value: "classic",
      label: "Дизель/Бензин"
    },
    color: {
      value: "white",
      label: "білий"
    },
    wheelSize: 20,
    image: "/assets/8.png",
    availability: "Доступний для локальної доставки",
    specs: {
      acceleration: "4.4",
      topSpeed: "135",
      autonomy: "389",
    },
    features: ["Carbon Fiber Spoiler"],
  }
]