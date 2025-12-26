-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
