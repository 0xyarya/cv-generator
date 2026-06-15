export type CvHeader = {
  full_name: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
};

export type CvBiodata = {
  full_name: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  religion: string;
  nationality: string;
};

export type CvEducation = {
  institution: string;
  degree: string;
  field_of_study: string;
  start_year: string;
  end_year: string;
  description: string;
};

export type CvWorkExperience = {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
};

export type CvProject = {
  name: string;
  role: string;
  tech_stack: string;
  link: string;
  description: string;
};

export type TemplateId = "classic" | "modern" | "minimal";

export type CvFormData = {
  header: CvHeader;
  biodata: CvBiodata;
  educations: CvEducation[];
  work_experiences: CvWorkExperience[];
  projects: CvProject[];
  skills: string[];
  hobbies: string[];
  template: TemplateId;
};

export const emptyEducation = (): CvEducation => ({
  institution: "",
  degree: "",
  field_of_study: "",
  start_year: "",
  end_year: "",
  description: "",
});

export const emptyWorkExperience = (): CvWorkExperience => ({
  company: "",
  position: "",
  start_date: "",
  end_date: "",
  description: "",
});

export const emptyProject = (): CvProject => ({
  name: "",
  role: "",
  tech_stack: "",
  link: "",
  description: "",
});

export const initialFormData = (): CvFormData => ({
  header: {
    full_name: "",
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    website: "",
  },
  biodata: {
    full_name: "",
    place_of_birth: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    religion: "",
    nationality: "",
  },
  educations: [emptyEducation()],
  work_experiences: [emptyWorkExperience()],
  projects: [emptyProject()],
  skills: [],
  hobbies: [],
  template: "classic",
});
