import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isTeacher } from '@/lib/teacher'

type RouteParams = Promise<{
  courseId: string;
  attachmentId: string;
}>

export async function DELETE(request: NextRequest, { params }: { params: RouteParams }) {
  try {
    const { userId } = await auth()
    const { courseId, attachmentId } = await params

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        createdById: userId,
      },
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: courseId,
        id: attachmentId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('ATTACHMENT_ID_DELETE', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}