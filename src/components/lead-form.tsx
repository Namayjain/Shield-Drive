"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const leadSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/, "Invalid US phone number"),
  zip_code: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
  car_year: z.number().int({ message: "Car year is required" }),
  car_make: z.string().min(1, "Car make is required"),
  car_model: z.string().min(1, "Car model is required"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function LeadForm() {
  const [years, setYears] = useState<number[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  });

  const selectedYear = watch("car_year");
  const selectedMake = watch("car_make");

  useEffect(() => {
    fetch("/api/vehicles/years")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setYears(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedYear) {
      setMakes([]);
      setModels([]);
      setValue("car_make", "");
      setValue("car_model", "");
      fetch(`/api/vehicles/makes?year=${selectedYear}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setMakes(data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedYear, setValue]);

  useEffect(() => {
    if (selectedYear && selectedMake) {
      setModels([]);
      setValue("car_model", "");
      fetch(`/api/vehicles/models?year=${selectedYear}&make=${selectedMake}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setModels(data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedYear, selectedMake, setValue]);

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }

      setIsSuccess(true);
      toast.success("Quote request submitted successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900">You're all set!</h3>
        <p className="text-gray-600 text-center">We've received your information and will be in touch shortly with your free quote.</p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">Submit another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Get Your Free Quote</h2>
        <p className="text-gray-500 text-sm">Fill out the form below to see how much you could save.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" placeholder="John" {...register("first_name")} className={errors.first_name ? "border-red-500" : ""} />
          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" placeholder="Doe" {...register("last_name")} className={errors.last_name ? "border-red-500" : ""} />
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="(555) 123-4567" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip_code">ZIP Code</Label>
          <Input id="zip_code" placeholder="12345" {...register("zip_code")} className={errors.zip_code ? "border-red-500" : ""} />
          {errors.zip_code && <p className="text-red-500 text-xs mt-1">{errors.zip_code.message}</p>}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Vehicle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="car_year">Year</Label>
            <select
              id="car_year"
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.car_year ? "border-red-500" : ""}`}
              {...register("car_year", { valueAsNumber: true })}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.car_year && <p className="text-red-500 text-xs mt-1">{errors.car_year.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="car_make">Make</Label>
            <select
              id="car_make"
              disabled={!selectedYear || makes.length === 0}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.car_make ? "border-red-500" : ""}`}
              {...register("car_make")}
            >
              <option value="">Select Make</option>
              {makes.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            {errors.car_make && <p className="text-red-500 text-xs mt-1">{errors.car_make.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="car_model">Model</Label>
            <select
              id="car_model"
              disabled={!selectedMake || models.length === 0}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.car_model ? "border-red-500" : ""}`}
              {...register("car_model")}
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            {errors.car_model && <p className="text-red-500 text-xs mt-1">{errors.car_model.message}</p>}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full h-12 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Get My Quote"}
      </Button>
    </form>
  );
}
