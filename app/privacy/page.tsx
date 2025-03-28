export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Analytics and Tracking
            </h2>
            <p>
              We use Umami Analytics to understand how visitors interact with
              our website. This helps us improve our services and provide a
              better user experience.
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">What We Track</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referral sources</li>
              <li>Browser type and device information</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">
              How We Use This Information
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>To improve website performance</li>
              <li>To understand user behavior</li>
              <li>To enhance user experience</li>
              <li>To identify and fix technical issues</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">Your Rights</h3>
            <p>
              You have the right to opt-out of analytics tracking at any time.
              You can do this by:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Using the cookie consent banner to decline analytics</li>
              <li>Clearing your browser cookies</li>
              <li>Using browser privacy settings</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">Data Protection</h3>
            <p>
              We take your privacy seriously. The analytics data we collect is:
            </p>
            <ul className="list-disc pl-6">
              <li>Anonymous and aggregated</li>
              <li>Never sold to third parties</li>
              <li>Used only for improving our services</li>
              <li>Stored securely</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
