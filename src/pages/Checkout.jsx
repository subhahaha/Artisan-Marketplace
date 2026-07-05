import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { checkoutSchema } from "../schemas/checkoutSchema";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      paymentMethod: "cod",
    },
  });

  const onSubmit = async (data) => {
    // simulate a network request — in a real app this would POST to a backend
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Order placed:", { ...data, items: cart, total });
    clearCart();
    navigate("/order-confirmed");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-2xl text-plum mb-2">
          Your cart is empty
        </p>
        <p className="text-ink-soft mb-6">
          Add something to your cart before checking out.
        </p>
        <Link
          to="/"
          className="inline-block bg-plum text-paper px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-plum-light transition-colors"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-plum mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Subha Maharjan"
            className={inputClass(errors.fullName)}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="9812345678"
            className={inputClass(errors.phone)}
          />
        </Field>

        <Field label="Delivery address" error={errors.address?.message}>
          <input
            {...register("address")}
            type="text"
            placeholder="Street, ward, landmark"
            className={inputClass(errors.address)}
          />
        </Field>

        <Field label="City" error={errors.city?.message}>
          <input
            {...register("city")}
            type="text"
            placeholder="Kathmandu"
            className={inputClass(errors.city)}
          />
        </Field>

        <Field label="Payment method" error={errors.paymentMethod?.message}>
          <div className="flex flex-col gap-2">
            {[
              { value: "cod", label: "Cash on delivery" },
              { value: "esewa", label: "eSewa" },
              { value: "khalti", label: "Khalti" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm text-ink cursor-pointer"
              >
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value={option.value}
                  className="accent-plum"
                />
                {option.label}
              </label>
            ))}
          </div>
        </Field>

        <div className="border-t border-ink/15 pt-5 flex items-center justify-between">
          <span className="font-display text-xl text-ink">Total</span>
          <span className="font-mono text-2xl text-gold font-medium">
            Rs. {total.toLocaleString()}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-plum text-paper px-8 py-3 rounded-sm font-medium hover:bg-plum-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Placing order…" : "Place order"}
        </button>
      </form>
    </div>
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