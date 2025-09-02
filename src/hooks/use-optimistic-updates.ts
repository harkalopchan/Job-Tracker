import { useState, useCallback } from "react";
import { useToast } from "./use-toast";

interface OptimisticUpdateOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  rollbackOnError?: boolean;
}

export function useOptimisticUpdates<T extends { id: string | number }>() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { addToast } = useToast();

  const optimisticUpdate = useCallback(
    async <K extends keyof T>(
      items: T[],
      updateFn: (items: T[]) => Promise<T[]>,
      optimisticData: Partial<T>,
      identifier: K,
      identifierValue: T[K],
      options: OptimisticUpdateOptions<T[]> = {}
    ) => {
      const { onSuccess, onError, rollbackOnError = true } = options;
      
      // Create optimistic update
      const optimisticItems = items.map(item => 
        item[identifier] === identifierValue 
          ? { ...item, ...optimisticData }
          : item
      );

      // Store original items for potential rollback
      const originalItems = [...items];
      
      try {
        setIsUpdating(true);
        
        // Apply optimistic update immediately
        const updatedItems = await updateFn(optimisticItems);
        
        // Success - update the items
        if (onSuccess) {
          onSuccess(updatedItems);
        }
        
        addToast("Updated successfully", "success");
        return updatedItems;
        
      } catch (error) {
        // Error - rollback if enabled
        if (rollbackOnError) {
          if (onError) {
            onError(error as Error);
          }
          addToast("Update failed, rolling back changes", "error");
          return originalItems;
        } else {
          throw error;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [addToast]
  );

  const optimisticCreate = useCallback(
    async (
      items: T[],
      createFn: (newItem: Partial<T>) => Promise<T>,
      newItemData: Partial<T>,
      options: OptimisticUpdateOptions<T[]> = {}
    ) => {
      const { onSuccess, onError, rollbackOnError = true } = options;
      
      // Create optimistic item with temporary ID
      const tempId = `temp-${Date.now()}` as string;
      const optimisticItem = { ...newItemData, id: tempId } as T;
      const optimisticItems = [...items, optimisticItem];
      
      try {
        setIsUpdating(true);
        
        // Apply optimistic update immediately
        const createdItem = await createFn(newItemData);
        
        // Replace optimistic item with real one
        const updatedItems = optimisticItems.map(item => 
          item.id === tempId ? createdItem : item
        );
        
        if (onSuccess) {
          onSuccess(updatedItems);
        }
        
        addToast("Created successfully", "success");
        return updatedItems;
        
      } catch (error) {
        // Error - rollback if enabled
        if (rollbackOnError) {
          if (onError) {
            onError(error as Error);
          }
          addToast("Creation failed, rolling back changes", "error");
          return items;
        } else {
          throw error;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [addToast]
  );

  const optimisticDelete = useCallback(
    async <K extends keyof T>(
      items: T[],
      deleteFn: (identifierValue: T[K]) => Promise<void>,
      identifier: K,
      identifierValue: T[K],
      options: OptimisticUpdateOptions<T[]> = {}
    ) => {
      const { onSuccess, onError, rollbackOnError = true } = options;
      
      // Store original items for potential rollback
      const originalItems = [...items];
      
      // Apply optimistic delete immediately
      const optimisticItems = items.filter(item => item[identifier] !== identifierValue);
      
      try {
        setIsUpdating(true);
        
        // Perform actual delete
        await deleteFn(identifierValue);
        
        if (onSuccess) {
          onSuccess(optimisticItems);
        }
        
        addToast("Deleted successfully", "success");
        return optimisticItems;
        
      } catch (error) {
        // Error - rollback if enabled
        if (rollbackOnError) {
          if (onError) {
            onError(error as Error);
          }
          addToast("Deletion failed, rolling back changes", "error");
          return originalItems;
        } else {
          throw error;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [addToast]
  );

  return {
    isUpdating,
    optimisticUpdate,
    optimisticCreate,
    optimisticDelete,
  };
}
