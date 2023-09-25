'use client';

import { Label, TextInput } from 'flowbite-react';

export default function InputSizing() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="small"
            value="Small input"
          />
        </div>
        <TextInput
          id="small"
          sizing="sm"
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="base"
            value="Base input"
          />
        </div>
        <TextInput
          id="base"
          sizing="md"
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="large"
            value="Large input"
          />
        </div>
        <TextInput
          id="large"
          sizing="lg"
          type="text"
        />
      </div>
    </div>
  )
}


