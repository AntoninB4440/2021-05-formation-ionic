import { Social } from "./social";

export interface Speaker {
    id: number;
    name: string;
    company: string;
    companyLogo: string;
    country: string;
    photoUrl: string;
    shortBio: string;
    socials: Array<Social>
}

