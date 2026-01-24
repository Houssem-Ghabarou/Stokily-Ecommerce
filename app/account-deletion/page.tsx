import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account Deletion - Stokily",
  description:
    "Learn how to request deletion of your Stokily account and understand what data is deleted or retained.",
};

export default function AccountDeletionPage() {
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
            Account Deletion
          </h1>
          <p className="text-gray-600 mb-8">Last Updated: January 2026</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Stokily allows you to create a personal account that can be used
              to access the Stokily mobile application and related services
              (including your connected e‑commerce website). This page explains
              how you can request deletion of your Stokily account and what
              happens to your data when you do so.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How to request deletion
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To request that your Stokily account and associated data be
              deleted, please contact us using the email address that is linked
              to your Stokily account.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>
                Send an email to{" "}
                <a
                  href="mailto:privacy@stokily.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  privacy@stokily.com
                </a>{" "}
                with the subject line{" "}
                <strong>&quot;Stokily account deletion request&quot;</strong>.
              </li>
              <li>
                In the email, include the email address of your Stokily account
                and clearly state that you want your account deleted.
              </li>
              <li>
                If you own one or more stores/companies inside Stokily, indicate
                whether you want those stores and all of their data to be
                deleted as well.
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-4">
              For your security, we may ask you to confirm your request or
              provide additional information to verify that you are the account
              owner before we process the deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. What will be deleted
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              When we process an account deletion request and it is approved, we
              will permanently delete or anonymize:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Your Stokily login account (email address, encrypted password,
                authentication identifiers, and profile information such as your
                name and phone number).
              </li>
              <li>
                Stores/companies that you own and explicitly ask us to delete,
                including their products, stock, invoices, tickets, and other
                business configuration data (unless we are required by law to
                retain specific records).
              </li>
              <li>
                E‑commerce sites that are solely linked to the deleted
                companies, along with their configuration data.
              </li>
              <li>
                Active authentication tokens and notification tokens associated
                with your account.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. What may be retained
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              In some cases we may need to retain limited information even after
              your account is deleted:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Transaction records (such as invoices, receipts, and accounting
                documents) that we are required to keep for tax, accounting, or
                other legal obligations. These records are retained only for as
                long as applicable law requires and may be kept for up to{" "}
                <strong>10 years</strong> in some jurisdictions.
              </li>
              <li>
                Security, audit, and anti‑fraud logs that are necessary to
                protect our services and other users. These logs are retained
                only for as long as needed for those purposes and are then
                deleted or anonymized.
              </li>
              <li>
                Aggregated or anonymized statistics that cannot be used to
                identify you personally.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Deletion timeline
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to process verified account deletion requests within{" "}
              <strong>30 days</strong>. In some cases (for example, if we must
              also delete or transfer ownership of existing stores/companies or
              comply with specific legal obligations), the process may take
              longer. We will inform you if additional time is required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about how account deletion works in Stokily
              or if you experience any issues with your deletion request, please
              contact us at{" "}
              <a
                href="mailto:privacy@stokily.com"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                privacy@stokily.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


