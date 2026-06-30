'use client'

import { Button } from '@/components/ui/button'

interface Props {
  itemName: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmDialog({ itemName, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
        <h2 className="text-lg font-semibold mb-2">Delete {itemName}?</h2>
        <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  )
}
