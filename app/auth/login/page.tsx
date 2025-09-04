import LoginPage from "@/components/LoginPage";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = (resolvedSearchParams?.callbackUrl as string) || "/";
  return <LoginPage callbackUrl={callbackUrl} />;
}
