import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva("inline-flex items-center font-medium transition-colors", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      outline: "border rounded-full px-3 py-1 text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />;
}
export { Badge, badgeVariants };
