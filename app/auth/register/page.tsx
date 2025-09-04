import RegisterPage from "@/components/RegistePage";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = (resolvedSearchParams?.callbackUrl as string) || "/";
  return <RegisterPage callbackUrl={callbackUrl} />;
}
