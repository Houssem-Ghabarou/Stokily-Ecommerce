import { WebsiteProduct } from "@/lib/api";
import { Sparkles, Tag, AlertTriangle } from "lucide-react";

interface ProductBadgesProps {
  product: WebsiteProduct;
  className?: string;
}

export default function ProductBadges({
  product,
  className = "",
}: ProductBadgesProps) {
  const badges: {
    type: "new" | "sale" | "low-stock";
    label: string;
    icon: React.ReactNode;
  }[] = [];

  // New badge
  if (product.isNew) {
    badges.push({
      type: "new",
      label: "New",
      icon: <Sparkles className="w-3 h-3" />,
    });
  }

  // Sale badge
  if (product.isOnSale && product.originalPrice) {
    const discount = Math.round(
      ((product.originalPrice - product.sellingPrice) / product.originalPrice) *
        100
    );
    badges.push({
      type: "sale",
      label: `-${discount}%`,
      icon: <Tag className="w-3 h-3" />,
    });
  }

  // Low stock badge (when less than 5 items)
  if (product.inStock && product.totalStock > 0 && product.totalStock < 5) {
    badges.push({
      type: "low-stock",
      label: `Only ${product.totalStock} left`,
      icon: <AlertTriangle className="w-3 h-3" />,
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {badges.map((badge) => (
        <span key={badge.type} className={`product-badge product-badge-${badge.type}`}>
          {badge.icon}
          <span className="ml-1">{badge.label}</span>
        </span>
      ))}
    </div>
  );
}

// Individual badge component for inline use
interface SingleBadgeProps {
  type: "new" | "sale" | "low-stock" | "out-of-stock";
  label?: string;
  discount?: number;
  stock?: number;
}

export function ProductBadge({ type, label, discount, stock }: SingleBadgeProps) {
  const getBadgeContent = () => {
    switch (type) {
      case "new":
        return {
          className: "product-badge-new",
          icon: <Sparkles className="w-3 h-3" />,
          text: "New",
        };
      case "sale":
        return {
          className: "product-badge-sale",
          icon: <Tag className="w-3 h-3" />,
          text: discount ? `-${discount}%` : "Sale",
        };
      case "low-stock":
        return {
          className: "product-badge-low-stock",
          icon: <AlertTriangle className="w-3 h-3" />,
          text: stock ? `Only ${stock} left` : "Low Stock",
        };
      case "out-of-stock":
        return {
          className: "bg-gray-500 text-white",
          icon: null,
          text: "Out of Stock",
        };
      default:
        return null;
    }
  };

  const content = getBadgeContent();
  if (!content) return null;

  return (
    <span className={`product-badge ${content.className}`}>
      {content.icon}
      <span className={content.icon ? "ml-1" : ""}>{label || content.text}</span>
    </span>
  );
}
