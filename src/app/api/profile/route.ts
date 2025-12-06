import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { user } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(req: NextRequest) {
    try {
        // Get the authenticated session
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse the request body
        const body = await req.json();
        const { fullName, phone, address, aboutMe } = body;

        // Validate input
        if (!fullName || fullName.trim() === '') {
            return NextResponse.json(
                { error: 'Full name is required' },
                { status: 400 }
            );
        }

        // Update the user in the database
        const updatedUser = await db
            .update(user)
            .set({
                name: fullName,
                phone: phone || null,
                address: address || null,
                aboutMe: aboutMe || null,
            })
            .where(eq(user.email, session.user.email));

        // Fetch the updated user data
        const [userData] = await db
            .select()
            .from(user)
            .where(eq(user.email, session.user.email))
            .limit(1);

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                aboutMe: userData.aboutMe,
            },
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch current user profile
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch user data
        const [userData] = await db
            .select()
            .from(user)
            .where(eq(user.email, session.user.email))
            .limit(1);

        if (!userData) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                aboutMe: userData.aboutMe,
            },
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}
