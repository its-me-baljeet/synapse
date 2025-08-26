export default function Footer() {
  return <footer className="flex justify-center py-4"><div className="text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left">
          © {new Date().getFullYear()} SynapseX. All rights reserved.
        </div></footer>;
}
