"use client";

import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PersonalProfileData } from "@/lib/schemas/application";

interface StepPersonalProfileProps {
  data: PersonalProfileData;
  onChange: (data: Record<string, unknown>) => void;
  onNext: () => void;
  errors: Record<string, string>;
}

export function StepPersonalProfile({
  data,
  onChange,
  onNext,
  errors,
}: StepPersonalProfileProps): React.ReactElement {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange({ [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/10 text-accent uppercase">
              Step 1
            </Badge>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              General Information
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Personal Profile
          </h2>
          <p className="text-base text-primary/70 md:text-lg">
            Let&apos;s start with your basic information and a professional
            headshot.
          </p>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">Profile Photo</h3>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 bg-secondary">
            <Upload className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <div className="w-full flex-1">
            <div className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary p-6 text-center transition-colors hover:bg-primary/5">
              <Upload className="mb-2 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
              <p className="text-sm font-bold">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                High-res headshot recommended (Max 5MB)
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground/60">
                Supports: JPG, PNG, HEIC
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            placeholder="Jane"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange}
            placeholder="+66 (0) 000-0000"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <Label htmlFor="address">Current Address</Label>
        <Input
          id="address"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Street Address"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="City"
          />
          <Input
            name="state"
            value={data.state}
            onChange={handleChange}
            placeholder="State/Province"
          />
          <Input
            name="zipCode"
            value={data.zipCode}
            onChange={handleChange}
            placeholder="Zip/Postal Code"
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-xl border border-dashed border-border bg-secondary p-6">
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold">
          Online Presence (Optional)
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              @
            </span>
            <Input
              name="instagram"
              value={data.instagram}
              onChange={handleChange}
              placeholder="Instagram Handle"
              className="pl-8"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              in/
            </span>
            <Input
              name="linkedin"
              value={data.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Profile"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
        <span className="text-xs text-muted-foreground italic">
          Your progress is saved automatically
        </span>
        <Button
          onClick={onNext}
          className="w-full gap-2 bg-primary font-bold text-white shadow-lg hover:bg-primary/90 md:w-auto"
        >
          Next Step: Wellness Journey
        </Button>
      </div>
    </div>
  );
}
