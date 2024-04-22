export const UPLOAD_ERROR_MESSAGE: string = "Er liep iets fout bij het opladen van het bestand. Probeer het later opnieuw.";
export const API_ERROR_MESSAGE: string = "Er liep iets fout bij het ophalen van de data. Probeer het later opnieuw.";
export const VALIDATION_ERROR: string = "Er liep iets fout bij het valideren van de data. Probeer het later opnieuw";
export const FILE_READ_ERROR: string = "File read error"
export const APPLICATION_PROFILES: string[] = [
  'Adresregister',
  'Besluit_Publicatie',
  'Dienstencataloog',
  'Generiek_basis',
  'Generieke_Terugmeldfaciliteit',
  'Notificatie_basis',
  'Organisatie_basis',
  'Persoon_basis',
  'Subsidieregister',
  'Contactvoorkeuren',
  'Dienst_Transactiemodel',
  'Vlaamse_codex',
]

export const MIME_TYPES: Record<string, string> = {
  APPLICATION_JSON: "application/json",
  LD_JSON: "application/ld+json",
  RDF_XML: "application/rdf+xml",
  TURTLE: "text/turtle",
  N_TRIPLES: "application/n-triples",
};

export const FILE_EXTENSIONS: Record<string, string> = {
  [MIME_TYPES.LD_JSON]: ".jsonld",
  [MIME_TYPES.RDF_XML]: ".xml",
  [MIME_TYPES.TURTLE]: ".ttl",
  [MIME_TYPES.N_TRIPLES]: ".nt",
};

export enum NamedNode {
  Conforms = 'http://www.w3.org/ns/shacl#conforms',
  Type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  ResultPath = 'http://www.w3.org/ns/shacl#resultPath',
  ResultMessage = 'http://www.w3.org/ns/shacl#resultMessage',
}

export const VALIDATION_REPORT = 'http://www.w3.org/ns/shacl#ValidationReport'
