import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Stokily",
  description:
    "Stokily Privacy Policy - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 text-sm font-medium"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">Last Updated: January 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Stokily. We are committed to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our mobile application and
              services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using Stokily, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with our policies and practices, please do not use our
              application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.1 Account Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you create an account, we collect your email address,
              password (encrypted), full name, and phone number for
              authentication and account management.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.2 Business Data
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect your company information, product catalog, inventory
              data, sales transactions, customer and supplier information,
              financial records (expenses and contributions), and employee data
              to provide our inventory and POS management services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2.3 Device Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We automatically collect device information, app usage data,
              network information, and crash reports to improve app stability
              and performance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Permissions We Request
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Camera:</strong> To scan barcodes for quick product
                entry and POS checkout.
              </li>
              <li>
                <strong>Push Notifications:</strong> To send you order updates, account
                alerts, and important service messages. You can manage notification
                permissions from your device settings.
              </li>
              <li>
                <strong>Photo Library:</strong> To upload product images,
                company logos, and attach receipts/documents.
              </li>
              <li>
                <strong>Microphone:</strong> For video recording features (if
                used).
              </li>
              <li>
                <strong>Location:</strong> To discover Bluetooth printers in
                your vicinity.
              </li>
              <li>
                <strong>Bluetooth:</strong> To connect to thermal printers for
                receipt printing.
              </li>
              <li>
                <strong>Storage:</strong> To save PDF invoices, reports, and
                export data.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use your information to provide, maintain, and improve our
              services, manage your account, sync data across devices, process
              transactions, generate reports, communicate with you, and ensure
              security. We do not sell your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Data Storage and Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is stored securely using Firebase (Google) for cloud
              storage and authentication. We implement encryption, secure
              authentication, and access controls. Data is retained while your
              account is active and can be deleted at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, correct, and delete your
              data. You can export your data, control app permissions through
              device settings, and delete your account at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use Firebase (Google) for authentication, database, and
              storage; Cloudinary for image processing; and thermal printers for
              receipt printing. These services have their own privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:privacy@stokily.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                privacy@stokily.com
              </a>{" "}
              or through the app support.
            </p>
          </section>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-800 font-medium">
              By using Stokily, you consent to our Privacy Policy and agree to
              its terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
