import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "../data/products";
import { productSchema } from "../schemas/productSchema";

const validCategories = categories.filter((c) => c !== "All");

export default function ProductForm({ initialValues, onSubmit, submitLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || {
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Field label="Product name" error={errors.name?.message}>
        <input
          {...register("name")}
          type="text"
          placeholder="Hand-thrown Terracotta Vase"
          className={inputClass(errors.name)}
        />
      </Field>

      <Field label="Category" error={errors.category?.message}>
        <select {...register("category")} className={inputClass(errors.category)}>
          <option value="">Select a category</option>
          {validCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-5">
        <Field label="Price (Rs.)" error={errors.price?.message}>
          <input
            {...register("price")}
            type="number"
            step="1"
            placeholder="1450"
            className={inputClass(errors.price)}
          />
        </Field>

        <Field label="Stock quantity" error={errors.stock?.message}>
          <input
            {...register("stock")}
            type="number"
            step="1"
            placeholder="8"
            className={inputClass(errors.stock)}
          />
        </Field>
      </div>

      <Field label="Image URL" error={errors.image?.message}>
        <input
          {...register("image")}
          type="text"
          placeholder="https://..."
          className={inputClass(errors.image)}
        />
      </Field>

      <Field label="Description" error={errors.description?.message}>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Describe the piece, materials, and craft technique..."
          className={inputClass(errors.description)}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-plum text-paper px-8 py-3 rounded-sm font-medium hover:bg-plum-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
      >
        {isSubmitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-soft mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full bg-white/70 border rounded-sm px-4 py-2.5 font-body text-ink focus:outline-none focus:ring-2 ${
    error
      ? "border-red-400 focus:ring-red-300"
      : "border-ink/15 focus:ring-gold/60"
  }`;
}