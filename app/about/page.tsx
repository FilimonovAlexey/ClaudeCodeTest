import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about TechBlog and our mission to share knowledge about modern web development.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1>About TechBlog</h1>

        <p className="lead">
          Welcome to TechBlog, your source for cutting-edge insights on web
          development, technology trends, and software engineering best
          practices.
        </p>

        <h2>Our Mission</h2>

        <p>
          We believe in making modern web development accessible to everyone.
          Our mission is to share knowledge, best practices, and practical
          tutorials that help developers at all levels build better
          applications.
        </p>

        <h2>What We Cover</h2>

        <ul>
          <li>
            <strong>Web Development</strong> - Latest frameworks, tools, and
            techniques
          </li>
          <li>
            <strong>React &amp; Next.js</strong> - In-depth tutorials and
            advanced patterns
          </li>
          <li>
            <strong>TypeScript</strong> - Type-safe development practices
          </li>
          <li>
            <strong>Performance</strong> - Optimization strategies and Core Web
            Vitals
          </li>
          <li>
            <strong>CSS &amp; Design</strong> - Modern layouts and styling
            techniques
          </li>
          <li>
            <strong>Architecture</strong> - Scalable application design
          </li>
        </ul>

        <h2>Our Approach</h2>

        <p>
          Every article on TechBlog is written with practical application in
          mind. We don't just explain concepts—we show you how to implement
          them in real-world projects.
        </p>

        <blockquote>
          <p>
            "The best way to learn is by doing. That's why our tutorials include
            working code examples and step-by-step instructions."
          </p>
        </blockquote>

        <h2>Join Our Community</h2>

        <p>
          TechBlog is more than just a blog—it's a community of passionate
          developers sharing knowledge and helping each other grow. We encourage
          you to:
        </p>

        <ul>
          <li>Share our articles with your network</li>
          <li>Provide feedback and suggestions</li>
          <li>Request topics you'd like us to cover</li>
          <li>Connect with us on social media</li>
        </ul>

        <h2>Stay Updated</h2>

        <p>
          Don't miss our latest articles! Subscribe to our newsletter to get
          new posts delivered straight to your inbox. We publish new content
          regularly, covering everything from quick tips to comprehensive
          guides.
        </p>

        <div className="not-prose mt-8">
          <a
            href="/blog"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Read Our Latest Articles
          </a>
        </div>
      </article>
    </div>
  );
}
