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
        const { fullName, phone, address, aboutMe, visibilityControl } = body ?? {};

        // Build update payload (support partial updates, e.g. visibility-control toggles)
        const updateData: Record<string, any> = {};

        if (fullName !== undefined) {
            if (!fullName || `${fullName}`.trim() === '') {
                return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
            }
            updateData.name = `${fullName}`.trim();
        }
        if (phone !== undefined) updateData.phone = phone || null;
        if (address !== undefined) updateData.address = address || null;
        if (aboutMe !== undefined) updateData.aboutMe = aboutMe || null;

        if (visibilityControl !== undefined && visibilityControl !== null) {
            const vc = visibilityControl;
            const toBool = (v: any) => v === true || v === 1 || v === "1" || v === "true";

            updateData.visibilityMinBid = toBool(vc.minBid) ? 1 : 0;
            updateData.visibilityCurrentBid = toBool(vc.currentBid) ? 1 : 0;
            updateData.visibilityBidHistory = toBool(vc.bidHistory) ? 1 : 0;
            updateData.visibilityPropertyStatus = toBool(vc.propertyStatus) ? 1 : 0;
            updateData.visibilityBidderList = toBool(vc.bidderList) ? 1 : 0;
            updateData.visibilityDocuments = toBool(vc.documents) ? 1 : 0;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        // Update the user in the database
        await db
            .update(user)
            .set({
                ...updateData,
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
                visibilityControl: {
                    minBid: (userData as any).visibilityMinBid === 1,
                    currentBid: (userData as any).visibilityCurrentBid === 1,
                    bidHistory: (userData as any).visibilityBidHistory === 1,
                    propertyStatus: (userData as any).visibilityPropertyStatus === 1,
                    bidderList: (userData as any).visibilityBidderList === 1,
                    documents: (userData as any).visibilityDocuments === 1,
                },
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
                visibilityControl: {
                    minBid: (userData as any).visibilityMinBid === 1,
                    currentBid: (userData as any).visibilityCurrentBid === 1,
                    bidHistory: (userData as any).visibilityBidHistory === 1,
                    propertyStatus: (userData as any).visibilityPropertyStatus === 1,
                    bidderList: (userData as any).visibilityBidderList === 1,
                    documents: (userData as any).visibilityDocuments === 1,
                },
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
