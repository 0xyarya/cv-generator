import { Field } from "./Field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CvBiodata } from "@/types/cv";

type Props = {
  value: CvBiodata;
  onChange: (next: CvBiodata) => void;
};

export function BiodataSection({ value, onChange }: Props) {
  const setText =
    (key: keyof CvBiodata) => (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...value, [key]: e.target.value });

  const setSelect = (key: keyof CvBiodata) => (val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field
        label="Nama Lengkap"
        id="bio-full_name"
        required
        placeholder="cth. Budi Santoso"
        value={value.full_name}
        onChange={setText("full_name")}
        className="sm:col-span-2"
      />
      <Field
        label="Tempat Lahir"
        id="bio-place"
        required
        placeholder="cth. Jakarta"
        value={value.place_of_birth}
        onChange={setText("place_of_birth")}
      />
      <Field
        label="Tanggal Lahir"
        id="bio-dob"
        required
        type="date"
        value={value.date_of_birth}
        onChange={setText("date_of_birth")}
      />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio-gender">
          Jenis Kelamin<span className="ml-0.5 text-destructive">*</span>
        </Label>
        <Select value={value.gender} onValueChange={setSelect("gender")}>
          <SelectTrigger id="bio-gender">
            <SelectValue placeholder="Pilih jenis kelamin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
            <SelectItem value="Perempuan">Perempuan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio-marital">Status Pernikahan</Label>
        <Select
          value={value.marital_status}
          onValueChange={setSelect("marital_status")}
        >
          <SelectTrigger id="bio-marital">
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
            <SelectItem value="Menikah">Menikah</SelectItem>
            <SelectItem value="Cerai">Cerai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio-religion">Agama</Label>
        <Select value={value.religion} onValueChange={setSelect("religion")}>
          <SelectTrigger id="bio-religion">
            <SelectValue placeholder="Pilih agama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Islam">Islam</SelectItem>
            <SelectItem value="Kristen Protestan">Kristen Protestan</SelectItem>
            <SelectItem value="Katolik">Katolik</SelectItem>
            <SelectItem value="Hindu">Hindu</SelectItem>
            <SelectItem value="Buddha">Buddha</SelectItem>
            <SelectItem value="Konghucu">Konghucu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Field
        label="Kewarganegaraan"
        id="bio-nationality"
        placeholder="cth. Indonesia (WNI)"
        value={value.nationality}
        onChange={setText("nationality")}
      />
    </div>
  );
}
