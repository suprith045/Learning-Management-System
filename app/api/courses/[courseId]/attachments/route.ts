import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isTeacher } from '@/lib/teacher'

type RouteParams = Promise<{
  courseId: string;
}>

export async function POST(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const { userId } = await auth()
    const { courseId } = await params
    const { url } = await request.json()

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

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('COURSE_ID_ATTACHMENTS_POST', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}