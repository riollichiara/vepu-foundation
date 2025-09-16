export type FlightDetails = {
  flightNumber: string;
  date: string;
  origin: { city: string; airport: string; country: string };
  destination: { city: string; airport: string; country: string };
  incident: { location: string; coordinates: [number, number]; note: string };
};

export type Passenger = { name: string; age: number; nat: string; seat: string };
export type CrewMember = { name: string; age: number; nat: string; role: string };

export const FLIGHT_DETAILS: FlightDetails = {
  flightNumber: "AB1108",
  date: "31-07-2011",
  origin: { city: "London", airport: "Heathrow (LHR)", country: "UK" },
  destination: { city: "Kingston", airport: "Norman Manley (KIN)", country: "Jamaica" },
  incident: {
    location: "Ceprano, Italia",
    coordinates: [41.521736, 13.487096],
    note:
      "Luogo dell'incidente. Si prega di recarsi sul posto per ulteriori analisi da portare in laboratorio.",
  },
};

// 50 passeggeri — nessun italiano; Chas J. Kupa ha 17Q (anomalia)
export const PASSENGERS: Passenger[] = [
  { name: "Adrian Bennett", age: 36, nat: "UK", seat: "12A" },
  { name: "Ethan Brooks", age: 41, nat: "CA", seat: "18C" },
  { name: "Dwayne Campbell", age: 33, nat: "JM", seat: "32B" },
  { name: "Amina El-Sayed", age: 27, nat: "EG", seat: "26A" },
  { name: "Mark Evans", age: 38, nat: "UK", seat: "14C" },
  { name: "Omar Farouk", age: 30, nat: "UK", seat: "28D" },
  { name: "Yara Mendes", age: 31, nat: "BR", seat: "21B" },
  { name: "Keisha Morgan", age: 22, nat: "JM", seat: "35A" },
  { name: "Jorge Morales", age: 40, nat: "ES", seat: "19F" },
  { name: "Natalie O’Connor", age: 34, nat: "IE", seat: "7A" },
  { name: "Sofia Petrova", age: 37, nat: "RU", seat: "15D" },
  { name: "Grace Thompson", age: 52, nat: "UK", seat: "5C" },
  { name: "Thomas Wainwright", age: 47, nat: "UK", seat: "11E" },
  { name: "Marlene Stewart", age: 39, nat: "UK", seat: "24A" },
  { name: "Chas J. Kupa", age: 31, nat: "JP", seat: "17Q" }, // anomalia
  { name: "Priya Nair", age: 28, nat: "IN", seat: "22C" },
  { name: "Liam O’Sullivan", age: 33, nat: "IE", seat: "6D" },
  { name: "Chen Wei", age: 42, nat: "CN", seat: "8B" },
  { name: "Carlos Mendez", age: 36, nat: "MX", seat: "20A" },
  { name: "Ana Fernández", age: 31, nat: "ES", seat: "16E" },
  { name: "Julia Schmidt", age: 29, nat: "DE", seat: "13A" },
  { name: "Pierre Dubois", age: 40, nat: "FR", seat: "27F" },
  { name: "Johan Andersson", age: 38, nat: "SE", seat: "4D" },
  { name: "Maria Oliveira", age: 26, nat: "BR", seat: "30C" },
  { name: "Ahmed Al-Najjar", age: 35, nat: "AE", seat: "3A" },
  { name: "Fatima Zahra", age: 24, nat: "MA", seat: "33E" },
  { name: "Kwame Mensah", age: 37, nat: "GH", seat: "22A" },
  { name: "Aisha Aden", age: 32, nat: "SO", seat: "29B" },
  { name: "Thabo Nkosi", age: 41, nat: "ZA", seat: "12F" },
  { name: "Sofia Novak", age: 27, nat: "PL", seat: "31D" },
  { name: "Petra Horváth", age: 34, nat: "HU", seat: "13F" },
  { name: "Jan Novak", age: 45, nat: "CZ", seat: "2C" },
  { name: "Elena Popescu", age: 36, nat: "RO", seat: "25B" },
  { name: "Dimitris Papadopoulos", age: 39, nat: "GR", seat: "17A" },
  { name: "Hasan Kaya", age: 33, nat: "TR", seat: "23C" },
  { name: "Noor Haddad", age: 28, nat: "JO", seat: "6A" },
  { name: "Sara Al-Sabah", age: 22, nat: "KW", seat: "30A" },
  { name: "Abdul Rahman", age: 44, nat: "SA", seat: "1D" },
  { name: "Peter Müller", age: 50, nat: "DE", seat: "9A" },
  { name: "Eva Nováková", age: 35, nat: "SK", seat: "16B" },
  { name: "Oleksandr Petrenko", age: 31, nat: "UA", seat: "11A" },
  { name: "Hannah Kim", age: 33, nat: "KR", seat: "8E" },
  { name: "Naomi Cohen", age: 29, nat: "IL", seat: "14A" },
  { name: "Miguel Silva", age: 28, nat: "PT", seat: "20F" },
  { name: "Lucas Martin", age: 27, nat: "AR", seat: "21E" },
  { name: "Luca Moreau", age: 30, nat: "FR", seat: "3F" },
  { name: "Oliver Brown", age: 36, nat: "UK", seat: "2A" },
  { name: "Emily Johnson", age: 25, nat: "US", seat: "4A" },
  { name: "Jacob Wilson", age: 34, nat: "US", seat: "18F" },
  { name: "Amelia Clark", age: 27, nat: "AU", seat: "23A" },
  { name: "Mateo Rojas", age: 33, nat: "CL", seat: "7F" },
  { name: "Anika Bose", age: 30, nat: "IN", seat: "24C" },
  { name: "Tarek Haddad", age: 38, nat: "LB", seat: "10D" },
  { name: "Helena Jansson", age: 29, nat: "SE", seat: "34C" },
];

export const CREW: CrewMember[] = [
  { name: "Capt. Robert Hayes", age: 54, nat: "UK", role: "Captain" },
  { name: "Mei Lin", age: 42, nat: "CN", role: "First Officer" },
  { name: "Carla Sousa", age: 39, nat: "BR", role: "Purser" },
  { name: "Noah Patel", age: 31, nat: "CA", role: "Cabin Crew" },
  { name: "Zanele Dlamini", age: 28, nat: "ZA", role: "Cabin Crew" },
];
