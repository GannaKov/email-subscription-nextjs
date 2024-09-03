import ButtonExmp from './ui/buttonExmp';
import StatusExmpl, { Status } from './ui/statusExmpl';
import StatusWithClxs from './ui/statusWithClxs';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1>Home Page</h1>
      <p className="text-xl">Welcome to the home page.</p>
      <StatusExmpl status={Status.NotActive}>Not Active</StatusExmpl>
      <StatusExmpl status={Status.Active}>Active</StatusExmpl>
      <div>
        <StatusWithClxs status={Status.NotActive} disabled>
          Disabled
        </StatusWithClxs>
        <StatusWithClxs status={Status.Active}>Active</StatusWithClxs>
      </div>
      <ButtonExmp disabled>Click me</ButtonExmp>
    </main>
  );
}
