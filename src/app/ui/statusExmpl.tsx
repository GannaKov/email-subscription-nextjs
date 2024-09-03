import React from 'react';

export enum Status {
  Active = 'active',
  NotActive = 'notActive',
}
export interface StatusExmplProps {
  children: React.ReactNode;
  status: Status;
}

const StatusExmpl = ({ children, status }: StatusExmplProps) => {
  return (
    <div
      className={`inline-flex w-40 items-center rounded-3xl border px-5 py-2 text-sm font-medium ${
        (status === Status.NotActive &&
          'border-zinc-700 bg-neutral-50 text-zinc-700') ||
        (status === Status.Active &&
          'border-green-700 bg-green-100 text-green-700') ||
        ''
      }`}
    >
      {children}
    </div>
  );
};

export default StatusExmpl;
