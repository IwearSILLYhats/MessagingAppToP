/*
  Warnings:

  - The values [PENDING] on the enum `friend_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `chatId` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "friend_status_new" AS ENUM ('ONE_PENDING_TWO', 'TWO_PENDING_ONE', 'DENIED', 'ACCEPTED', 'BLOCKED', 'ONE_BLOCKED_TWO', 'TWO_BLOCKED_ONE');
ALTER TABLE "public"."Friendship" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Friendship" ALTER COLUMN "status" TYPE "friend_status_new" USING ("status"::text::"friend_status_new");
ALTER TYPE "friend_status" RENAME TO "friend_status_old";
ALTER TYPE "friend_status_new" RENAME TO "friend_status";
DROP TYPE "public"."friend_status_old";
ALTER TABLE "Friendship" ALTER COLUMN "status" SET DEFAULT 'ONE_PENDING_TWO';
COMMIT;

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "chatId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ONE_PENDING_TWO';

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
