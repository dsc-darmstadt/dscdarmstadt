import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { dbProjectToProject, projectToDbProject } from '@/lib/utils/converters';

export const runtime = 'edge';

export async function GET() {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Convert database projects to frontend format
    const convertedProjects = projects.map(dbProjectToProject);

    return NextResponse.json({
      success: true,
      data: convertedProjects,
      message: 'Projects fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'imageUrl', 'technologies'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
            message: 'Validation error'
          },
          { status: 400 }
        );
      }
    }

    // Convert frontend project to database format
    const dbProject = projectToDbProject(body);

    const { data, error } = await supabase
      .from('projects')
      .insert(dbProject)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Convert back to frontend format
    const newProject = dbProjectToProject(data);

    return NextResponse.json({
      success: true,
      data: newProject,
      message: 'Project created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create project',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}