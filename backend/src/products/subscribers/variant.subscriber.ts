import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from 'typeorm';
import { Variant } from '../entities/variant.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

@EventSubscriber()
export class VariantSubscriber implements EntitySubscriberInterface<Variant> {
  listenTo() {
    return Variant;
  }

  async afterUpdate(event: UpdateEvent<Variant>) {
    // Only proceed if event.entity exists
    console.log(event.databaseEntity, 'kdkdkdkdkddkdk');
    if (!event.entity || !event.databaseEntity) return;

    const oldDeletedAt = event.databaseEntity.deletedAt;
    const newDeletedAt = event.entity.deletedAt;

    // Trigger only when soft-deleted
    if (!oldDeletedAt && newDeletedAt) {
      const variantId = event.entity.id;
      await event.manager
        .getRepository(Favorite)
        .delete({ variant: { id: variantId } });
    }
  }
}
