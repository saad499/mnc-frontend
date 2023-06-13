export interface MemeberProfil {
    Nom: string;
    Prenom: string;
    Team_bio: string;
    Linkedin_url: string;
    Description: string;
    Photo: Media;
    Video: Media[];
    Parcours: string;
  }
  
  export interface Media {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: any;
    provider: string;
    provider_metadata: any;
    created_at: string;
    updated_at: string;
  }