import { Field } from "./Field";
import type { CvHeader } from "@/types/cv";

type Props = {
  value: CvHeader;
  onChange: (next: CvHeader) => void;
};

export function HeaderSection({ value, onChange }: Props) {
  const set = (key: keyof CvHeader) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field
        label="Nama Lengkap"
        id="header-full_name"
        required
        placeholder="cth. Budi Santoso"
        value={value.full_name}
        onChange={set("full_name")}
        className="sm:col-span-2"
      />
      <Field
        label="Alamat Lengkap"
        id="header-address"
        placeholder="cth. Jl. Merdeka No. 10, Jakarta"
        value={value.address}
        onChange={set("address")}
        className="sm:col-span-2"
      />
      <Field
        label="Nomor Telepon"
        id="header-phone"
        placeholder="cth. 0812-3456-7890"
        value={value.phone}
        onChange={set("phone")}
      />
      <Field
        label="Email"
        id="header-email"
        type="email"
        placeholder="cth. budi@email.com"
        value={value.email}
        onChange={set("email")}
      />
      <Field
        label="LinkedIn"
        id="header-linkedin"
        placeholder="cth. linkedin.com/in/budi"
        value={value.linkedin}
        onChange={set("linkedin")}
      />
      <Field
        label="Website / Portfolio"
        id="header-website"
        placeholder="cth. budisantoso.com"
        value={value.website}
        onChange={set("website")}
      />
    </div>
  );
}
