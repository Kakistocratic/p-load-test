import type { Field } from 'payload'

export const blockSpacing: Field = {
  name: 'blockSpacing',
  type: 'select',
  defaultValue: 'medium',
  options: [
    {
      label: 'None',
      value: 'none',
    },
    {
      label: 'Small',
      value: 'small',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
  ],
  admin: {
    description: 'Controls the vertical spacing (margin) around this block',
  },
}

export const blockSpacingClasses = {
  none: '',
  small: 'my-8 lg:my-12',
  medium: 'my-16 lg:my-20',
}
