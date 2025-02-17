import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inject, forwardRef } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins or specify frontend URLs here
  },
})
export class AnnouncementsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => AnnouncementsService)) // Use forwardRef to resolve circular dependency
    private readonly announcementsService: AnnouncementsService,
  ) {}

  // Create Announcement
  @SubscribeMessage('createAnnouncement')
  async handleCreateAnnouncement(@MessageBody() dto: CreateAnnouncementDto) {
    console.log('Received createAnnouncement request:', dto);

    const announcement = await this.announcementsService.create(dto);

    // Log screen IDs to verify they are passed correctly
    const screenIds = dto.screenIds || [];
    console.log('Screen IDs to broadcast to:', screenIds);

    // Check if screenIds is empty or undefined
    if (screenIds.length === 0) {
      console.log('No screen IDs provided, skipping broadcast.');
    }

    // Emit the new announcement to selected screens
    await this.broadcastAnnouncementToScreens(announcement, screenIds);

    return announcement;
  }

  // Handle announcement deactivation (e.g., after displaying on the screen)
  @SubscribeMessage('deactivateAnnouncement')
  async handleDeactivateAnnouncement(@MessageBody() id: number) {
    await this.announcementsService.markAsInactive(id);

    return { id };
  }

  // Broadcast an announcement only to the specified screens
  async broadcastAnnouncementToScreens(announcement: any, screenIds: number[]) {
    console.log('Inside broadcastAnnouncementToScreens method');
    console.log('Broadcasting to screens:', screenIds);

    if (!Array.isArray(screenIds) || screenIds.length === 0) {
      console.error('Invalid or empty screenIds array:', screenIds);
      return;
    }

    for (const screenId of screenIds) {
      console.log(`Broadcasting announcement to screen ${screenId}`);

      // We no longer need to track sockets since the frontend will handle it
      this.server.emit(`announcementToScreen-${screenId}`, announcement);
    }
  }
}
