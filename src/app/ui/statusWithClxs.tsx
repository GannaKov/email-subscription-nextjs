import React from 'react';
import clsx from 'clsx';

export enum Status {
  Active = 'active',
  NotActive = 'notActive',
}
export interface StatusExmplWithClsxProps {
  children: React.ReactNode;
  status: Status;
  disabled?: boolean;
}

const StatusWithClxs = ({
  children,
  status,
  disabled,
}: StatusExmplWithClsxProps) => {
  return (
    <div
      className={clsx(
        `inline-flex items-center py-2 px-5 rounded-3xl text-sm font-medium border`,
        status === Status.NotActive &&
          'text-zinc-700 bg-neutral-50 border-zinc-700',
        status === Status.Active && 'text-red-600 bg-red-100 border-red-600',
        {
          ['opacity-75 cursor-not-allowed']: disabled,
        },
      )}
    >
      {children}
    </div>
  );
};

export default StatusWithClxs;
